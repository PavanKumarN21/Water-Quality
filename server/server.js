import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["https://water-quality-frontend.onrender.com", "http://localhost:5173"]
}));

console.log("CORS Origins:", ["https://water-quality-frontend.onrender.com", "http://localhost:5173"]);


app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("Mongo Error:", err));

const   PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
