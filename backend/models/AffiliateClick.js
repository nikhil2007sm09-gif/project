import mongoose from 'mongoose'

const affiliateClickSchema = new mongoose.Schema({
  affiliateLink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AffiliateLink',
    required: true
  },
  affiliate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: String,
  referrer: String,
  converted: {
    type: Boolean,
    default: false
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  }
}, {
  timestamps: true
})

// Index for faster queries
affiliateClickSchema.index({ affiliate: 1, createdAt: -1 })
affiliateClickSchema.index({ affiliateLink: 1 })

export default mongoose.model('AffiliateClick', affiliateClickSchema)
