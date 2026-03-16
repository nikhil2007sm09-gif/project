import mongoose from 'mongoose'

const archivedProductSchema = new mongoose.Schema({
  // Original product data
  originalProductId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  images: [String],
  sizes: [String],
  colors: [String],
  stock: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  
  // Vendor information
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArchivedUser'
  },
  vendorEmail: String,
  vendorName: String,
  
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
  
  // Sales data
  salesData: {
    totalSold: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    lastSoldAt: Date
  }
}, {
  timestamps: true
})

export default mongoose.model('ArchivedProduct', archivedProductSchema)