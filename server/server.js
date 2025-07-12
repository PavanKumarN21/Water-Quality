import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://water-quality-frontend.onrender.com"
];

// CORS config with dynamic origin checking
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

console.log("✅ CORS origins allowed:", allowedOrigins);

app.use("/api/auth", authRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
