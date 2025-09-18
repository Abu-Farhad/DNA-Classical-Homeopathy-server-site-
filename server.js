import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// -------------------
// App configuration
// -------------------
const app = express();
const port = process.env.PORT || 4000;

// Connect Database & Cloudinary
connectDB();
connectCloudinary();

// -------------------
// CORS Configuration
// -------------------
const allowedPatterns = [
  /^https:\/\/dna-classical-homeopathy-clientsite.*\.vercel\.app$/,
  /^https:\/\/dna-classical-homeopathy-admin-site.*\.vercel\.app$/,
  /^http:\/\/localhost:\d{4}$/ // local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server requests
    if (allowedPatterns.some(pattern => pattern.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Handle preflight requests globally
app.options('*', cors());

// -------------------
// Middlewares
// -------------------
app.use(express.json());

// -------------------
// API Routes
// -------------------
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API WORKING Great');
});

// -------------------
// Start Server
// -------------------
app.listen(port, () => console.log(`Server started on port ${port}`));
