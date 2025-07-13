import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const router = express.Router();

// Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
