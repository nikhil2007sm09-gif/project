import mongoose from 'mongoose'

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hexCode: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true })

export default mongoose.model('Color', colorSchema)
