import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  image: {
    type: String
  },
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

// Virtual to get main image
productSchema.virtual('mainImage').get(function() {
  if (this.images && this.images.length > 0) {
    return this.images[0]
  }
  return this.image || ''
})

export default mongoose.model('Product', productSchema)
