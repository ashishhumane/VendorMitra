const mongoose = require('mongoose');

const groupBuySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      quantity: Number
    }
  ],
  targetQuantity: { type: Number, required: true },
  currentQuantity: { type: Number, default: 0 },
  maxParticipants: { type: Number, default: 10 },
  negotiatedPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String,
  isActive: { type: Boolean, default: true },
  isSuccessful: { type: Boolean, default: false },
  endsAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GroupBuy', groupBuySchema);
