import mongoose from 'mongoose'

const affiliateLinkSchema = new mongoose.Schema({
  affiliate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referralCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  clicks: {
    type: Number,
    default: 0
  },
  conversions: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Generate unique referral code
affiliateLinkSchema.statics.generateReferralCode = async function(affiliateId) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code
  let exists = true
  
  while (exists) {
    code = 'AFF-'
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    exists = await this.findOne({ referralCode: code })
  }
  
  return code
}

export default mongoose.model('AffiliateLink', affiliateLinkSchema)
