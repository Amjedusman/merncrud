import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import { protect, authorizeRoles  } from "./middleware/authMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";



dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend + DB working 🚀" });
});

// app.get("/api/create-test-user", async (req, res) => {
//   try {
//     const user = await User.create({
//       name: "Test User",
//       email: "test@example.com",
//       password: "123456"
//     });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Protected Route Example
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user
  });
});

// Admin Route Example
app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin access only 🔐" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});