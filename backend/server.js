import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import authRoutes from './routes/auth.js'
import otpRoutes from './routes/otp.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import paymentRoutes from './routes/payment.js'
import adminRoutes from './routes/admin.js'
import affiliateRoutes from './routes/affiliate.js'
import categoryRoutes from './routes/categories.js'
import blogRoutes from './routes/blogs.js'
import uploadRoutes from './routes/upload.js'
import contactRoutes from './routes/contact.js'
import sizeRoutes from './routes/sizes.js'
import colorRoutes from './routes/colors.js'
import archiveRoutes from './routes/archive.js'
import testimonialRoutes from './routes/testimonials.js'
import statsRoutes from './routes/stats.js'
import sliderRoutes from './routes/sliders.js'
import teamRoutes from './routes/team.js'
import connectDB from './config/db.js'
import config from './config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, config.uploadDir)))

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/auth', otpRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/affiliate', affiliateRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/sizes', sizeRoutes)
app.use('/api/colors', colorRoutes)
app.use('/api/archive', archiveRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/sliders', sliderRoutes)
app.use('/api/team', teamRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'ClothesShop API' })
})

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
