import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// ----------------------
// App config
// ----------------------
const app = express();
const port = process.env.PORT || 4000;

// ----------------------
// Connect DB + Cloudinary
// ----------------------
connectDB();
connectCloudinary();

// ----------------------
// Allowed Origins
// ----------------------
const allowedOrigins = [
  'https://dna-classical-homeopathy-client-sit.vercel.app', // deployed client
  'https://dna-classical-homeopathy-admin-site.vercel.app', // deployed admin
  'http://localhost:5173', // local client
  'http://localhost:5174'  // local admin
];

// ----------------------
// Middlewares
// ----------------------
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// ----------------------
// Routes
// ----------------------
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API WORKING Great');
});

// ----------------------
// Start server
// ----------------------
app.listen(port, () => console.log(`Server started on port ${port}`));
