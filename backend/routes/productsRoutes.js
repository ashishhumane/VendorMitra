const express = require('express')
const userModel = require('../models/userModel')
const productModel = require('../models/productsModel')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken')
const verify = require('../middleware/auth')

router.post('/add', verify, async (req, res) => {
    console.log(req.user);

    try {
        const { formData } = req.body
        const newProduct = await productModel.create({
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: formData.price,
            quantity: formData.quantity,
            unit: formData.unit,
            imageUrl: formData.imageUrl,
            supplierId: req.user.id
        })
        res.status(201).json({ newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/all', async (req, res) => {
  try {
    // Populate 'supplierId' field with user details
    const products = await productModel.find().populate('supplierId', 'name email'); // only select name and email

    res.status(200).json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router