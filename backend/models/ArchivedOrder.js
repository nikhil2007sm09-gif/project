import mongoose from 'mongoose'

const archivedOrderSchema = new mongoose.Schema({
  // Original order data
  originalOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderNumber: String,
  
  // Customer information
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArchivedUser'
  },
  customerEmail: String,
  customerName: String,
  customerPhone: String,
  
  // Order details
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ArchivedProduct'
    },
    productName: String,
    quantity: Number,
    price: Number,
    size: String,
    color: String
  }],
  
  totalAmount: {
    type: Number,
    required: true
  },
  
  // Shipping information
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Payment information
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  
  // Order status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  // Affiliate information
  affiliateCode: String,
  affiliateCommission: Number,
  
  // Archive metadata
  deletedAt: {
    type: Date,
    default: Date.now
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deletionReason: String,
  
  // Original timestamps
  originalCreatedAt: Date,
  originalUpdatedAt: Date
}, {
  timestamps: true
})

export default mongoose.model('ArchivedOrder', archivedOrderSchema)