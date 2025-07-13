import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';

dotenv.config();
console.log("🚀 Starting server...");

const app = express();

// Body parser
app.use(express.json());

// ✅ CORS: Allow both local and deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://water-quality-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
}));

// Routes
app.use("/api/auth", authRouter);

// ✅ MongoDB connection with clear logs
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err.message);
});
