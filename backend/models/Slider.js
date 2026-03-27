import mongoose from 'mongoose'

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Shop Now'
  },
  buttonLink: {
    type: String,
    default: '/products'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['hero', 'popular', 'featured'],
    default: 'hero'
  }
}, {
  timestamps: true
})

export default mongoose.model('Slider', sliderSchema)