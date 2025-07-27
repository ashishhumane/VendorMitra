const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String, // e.g., 'kg', 'piece', 'litre'
        default: 'piece'
    },
    imageUrl: {
        type: String,
        default: '' // optional product image
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
