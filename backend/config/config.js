import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/clothesshop',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  nodeEnv: process.env.NODE_ENV || 'development',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
}

export default config
