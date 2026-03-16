import mongoose from 'mongoose'

const archivedUserSchema = new mongoose.Schema({
  // Original user data
  originalUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'vendor', 'affiliate', 'admin'],
    required: true
  },
  phone: String,
  approved: {
    type: Boolean,
    default: false
  },
  affiliateCode: String,
  businessDetails: {
    businessName: String,
    businessAddress: String,
    phone: String,
    gstNumber: String,
    website: String,
    socialMedia: String
  },
  
  // Activity tracking data
  lastLoginAt: Date,
  lastLogoutAt: Date,
  totalActiveTime: {
    type: Number,
    default: 0
  },
  currentSessionStart: Date,
  loginHistory: [{
    email: String,
    loginAt: Date,
    logoutAt: Date,
    duration: Number,
    ipAddress: String,
    userAgent: String
  }],
  
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
  
  // Related data counts
  relatedData: {
    productsCount: {
      type: Number,
      default: 0
    },
    ordersCount: {
      type: Number,
      default: 0
    },
    commissionsCount: {
      type: Number,
      default: 0
    },
    clicksCount: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
})

export default mongoose.model('ArchivedUser', archivedUserSchema)