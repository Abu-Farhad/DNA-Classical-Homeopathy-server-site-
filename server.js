import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000

// connect DB + Cloudinary
connectDB()
connectCloudinary()

// Allowed Origins (your frontends)
const allowedOrigins = [
  'https://dna-classical-homeopathy-clientsite-2zq1vhgj0.vercel.app', // deployed client
  'https://dna-classical-homeopathy-admin-site-hwrvjcmrn.vercel.app/', // deployed admin
  'http://localhost:5173', // local client (vite default)
  'http://localhost:5174'  // local admin
]

// middlewares
app.use(express.json())

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) // ✅ allow
    } else {
      callback(new Error("Not allowed by CORS")) // ❌ block
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}))

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
// localhost:4000/api/admin/add-doctor

app.get('/', (req, res) => {
  res.send('API WORKING Great')
})

app.listen(port, () => console.log("server started on port", port))
