import mongoose from 'mongoose'

const affiliateCommissionSchema = new mongoose.Schema({
  affiliate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'paid', 'rejected'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  approvedAt: Date,
  paidAt: Date,
  paymentMethod: String,
  paymentReference: String,
  notes: String
}, {
  timestamps: true
})

// Index for faster queries
affiliateCommissionSchema.index({ affiliate: 1, status: 1 })
affiliateCommissionSchema.index({ order: 1 })

export default mongoose.model('AffiliateCommission', affiliateCommissionSchema)
