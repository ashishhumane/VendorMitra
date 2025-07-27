const express = require('express')
const userModel = require('../models/userModel')
const OrderModel = require('../models/orderModel')
const GroupBuy = require('../models/groupBYModel')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken')
const verify = require('../middleware/auth')

router.post('/create', async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    const token = generateToken(newUser);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log(token);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: user.name,
        role: user.role
      }
    });

    // res.send(newUser)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Something went wrong');
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // set to true in production with HTTPS
      sameSite: 'None', // or 'None' if using different domains and HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax', // or 'None' if using cross-site
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/me', verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/cart/add', verify, async (req, res) => {
  const userId = req.user.id; // from auth middleware
  const { productId, quantity } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if product already in cart
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      user.cart[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Cart updated successfully', cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/cart", verify, async (req, res) => {
  try {
    const userId = req.user.id; // You should get this from auth middleware
    const user = await userModel.findById(userId).populate("cart.productId");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /order/place
router.post('/order/place', verify, async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user is authenticated and req.user is set
    const { name, address, phone } = req.body;

    // Fetch user's cart from DB
    const user = await userModel.findById(userId).populate('cart.productId');
    if (!user || !user.cart.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total price
    const totalPrice = user.cart.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    // Create order document
    const newOrder = new OrderModel({
      userId,
      items: user.cart,
      deliveryDetails: { name, address, phone },
      totalPrice,
    });
    await newOrder.save();
    user.orders.push(newOrder._id);

    // Clear user's cart
    user.cart = [];
    await user.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

router.post('/groupbuy/create', verify, async (req, res) => {
  const { productId, targetQuantity, endsAt, maxParticipants, negotiatedPrice } = req.body;

  // Validation
  if (!productId || !targetQuantity || !endsAt) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newGroupBuy = new GroupBuy({
      productId,
      createdBy: req.user.id, // From token
      targetQuantity,
      endsAt,
      currentQuantity: 0,
      isActive: true,
      isSuccessful: false,
      participants: [],
      maxParticipants,
      negotiatedPrice
    });

    await newGroupBuy.save();
    return res.status(201).json({ message: 'Group Buy created', groupBuy: newGroupBuy });

  } catch (err) {
    console.error('Error creating group buy:', err);
    return res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

router.get('/groupsCreated/all', async (req, res) => {
  try {
    const groupBuys = await GroupBuy.find()
      .populate('productId')
      .populate('createdBy', 'name') // Optional: to fetch product details
      .sort({ createdAt: -1 });

    res.status(200).json(groupBuys);
  } catch (error) {
    console.error('Error fetching group buys:', error);
    res.status(500).json({ message: 'Failed to fetch group buys' });
  }
});

router.get('/groupsCreated/joined', verify, async (req, res) => {
  try {
    const groupBuysJoined = await GroupBuy.find({ 'participants.userId': req.user.id })
      .populate('productId')
      .populate('createdBy', 'name') // Optional: to fetch product details
      .sort({ createdAt: -1 });

    res.status(200).json(groupBuysJoined);
  } catch (error) {
    console.error('Error fetching group buys:', error);
    res.status(500).json({ message: 'Failed to fetch group buys' });
  }
});

router.post('/groupbuy/join/:id', verify, async (req, res) => {
  try {
    const group = await GroupBuy.findById(req.params.id);
    if (!group || !group.isActive) {
      return res.status(400).json({ message: 'Group not found or inactive' });
    }
    
    
    const existingParticipant = group.participants.find(
      (p) => p.userId.toString() === req.user.id
    );

    if (existingParticipant) {
      existingParticipant.quantity += req.body.quantity;
    } else {
      group.participants.push({
        userId: req.user.id,
        quantity: req.body.quantity,
      });
    }

    if (group.participants.length >= group.maxParticipants) {
      return res.status(400).json({ message: 'Participant limit reached, cannot join.' });
    }

    if (group.currentQuantity >= group.targetQuantity) {
      return res.status(400).json({ message: 'Target quantity reached, no more joins allowed.' });
    }

    group.currentQuantity += req.body.quantity;

    if (group.currentQuantity >= group.targetQuantity) {
      group.isSuccessful = true;
      group.isActive = false;
    }

    await group.save();

    res.status(200).json({ message: 'Joined group successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to join group' });
  }
});


router.post('/groupbuy/respond/:groupId', verify, async (req, res) => {
  try {
    const { groupId } = req.params;
    const { action, rejectionReason } = req.body;

    const group = await GroupBuy.findById(groupId).populate('participants.userId');

    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (!group.createdBy.equals(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (group.status !== 'pending') {
      return res.status(400).json({ message: 'Group buy already responded' });
    }

    if (action === 'accept') {
      group.status = 'accepted';
      group.isActive = false;
      await group.save();

      const orderPromises = group.participants.map(participant => {
        const quantity = participant.quantity;
        const pricePerUnit = group.negotiatedPrice;
        const totalPrice = quantity * pricePerUnit;

        return Order.create({
          userId: participant.userId._id || participant.userId,
          items: [
            {
              productId: group.productId,
              quantity
            }
          ],
          total: totalPrice
        });
      });

      await Promise.all(orderPromises);

      return res.status(200).json({ message: 'Group buy accepted and orders placed', group });
    }

    if (action === 'reject') {
      group.status = 'rejected';
      group.isActive = false;
      group.rejectionReason = rejectionReason || '';
      await group.save();

      // TODO: Notify participants about rejection

      return res.status(200).json({ message: 'Group buy rejected and participants notified', group });
    }

    res.status(400).json({ message: 'Invalid action' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing supplier response' });
  }
});

router.get('/myorders', verify, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.find({ userId })
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user orders', error: err });
  }
});


module.exports = router
