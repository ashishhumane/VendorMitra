const express = require('express')
const userModel = require('../models/userModel')
const OrderModel = require('../models/orderModel')
const GroupBuy = require('../models/groupBYModel')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken')
const verify = require('../middleware/auth')
const productsModel = require('../models/productsModel')

// supplier routes 

router.get('/get', verify, async (req, res) => {
  try {
    const supplierId = req.user.id;
    const supplier = await userModel.findById(supplierId).select('-password'); // exclude password

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json(supplier); // send supplier data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/orders/all', verify, async (req, res) => {
  try {
    const supplierId = req.user.id;

    // Get all products added by this supplier
    const supplierProducts = await productsModel.find({ supplierId }).select('_id');

    const productIds = supplierProducts.map(prod => prod._id);
    console.log("Supplier's productIds:", productIds);

    // Get orders containing at least one of the supplier's products
    const orders = await OrderModel.find({ 'items.productId': { $in: productIds } })
      .populate('userId', 'name email')
      .populate('items.productId', 'name price supplierId')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Failed to get supplier orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

router.get('/mysupplies', verify, async (req, res) => {
  try {
    const supplierId = req.user.id;
    const products = await productsModel.find({ supplierId }); // find products by supplierId
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching supplier products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/groupbuys', verify, async (req, res) => {
  try {
    const supplierId = req.user.id;

    // Step 1: Find all product IDs created by this supplier
    const products = await productsModel.find({supplierId }).select('_id');
    const productIds = products.map(p => p._id);
    // console.log(productIds);
    
    // Step 2: Get all group buys for those products
    const groupBuys = await GroupBuy.find({ productId: { $in: productIds } })
      .populate('productId')
      .populate('createdBy')
      .populate('participants.userId');

    res.json(groupBuys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/groupbuys/:id/accept', verify, async (req, res) => {
  try {
    const groupBuy = await GroupBuy.findById(req.params.id)
      .populate('participants.userId')
      .populate('productId');

    if (!groupBuy) return res.status(404).json({ error: 'Group Buy not found' });
    if (groupBuy.status === 'accepted') return res.status(400).json({ error: 'Already accepted' });

    const orders = [];

    for (let p of groupBuy.participants) {
      const quantity = p.quantity;
      const total = quantity * groupBuy.negotiatedPrice;

      const newOrder = new OrderModel({
        userId: p.userId._id,
        items: [{
          productId: groupBuy.productId._id,
          quantity
        }],
        total
      });

      try {
        const savedOrder = await newOrder.save();
        orders.push(savedOrder);

        // ⬇️ Update user document with new order ID
        await userModel.findByIdAndUpdate(
          p.userId._id,
          { $push: { orders: savedOrder._id } },
          { new: true }
        );

        console.log(`Order created and added to user ${p.userId.name}`);
      } catch (err) {
        console.error('Order creation failed:', err.message);
      }
    }

    groupBuy.status = 'accepted';
    groupBuy.isActive = false;
    groupBuy.isSuccessful = true;
    await groupBuy.save();

    res.json({ message: 'Orders placed and users updated', orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/groupbuys/:id/reject', verify, async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason || reason.trim() === '') {
      return res.status(400).json({ error: 'Rejection reason is required' });
    }

    const groupBuy = await GroupBuy.findById(req.params.id);

    if (!groupBuy) {
      return res.status(404).json({ error: 'Group Buy not found' });
    }

    if (groupBuy.status !== 'pending') {
      return res.status(400).json({ error: `Cannot reject a group buy that is already ${groupBuy.status}` });
    }

    groupBuy.status = 'rejected';
    groupBuy.rejectionReason = reason;
    groupBuy.isActive = false;
    groupBuy.isSuccessful=false;

    await groupBuy.save();

    res.json({ message: 'Group buy rejected successfully' });
  } catch (err) {
    console.error('Rejection failed:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router