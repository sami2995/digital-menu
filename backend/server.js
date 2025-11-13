import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const {
  ADMIN_USERNAME = "",
  ADMIN_PASSWORD = "",
  JWT_SECRET = "",
} = process.env;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !JWT_SECRET) {
  throw new Error("ADMIN_USERNAME, ADMIN_PASSWORD, and JWT_SECRET must be set.");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Menu Schema & Model
const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
   image: String 
});

const MenuItem = mongoose.model("MenuItem", menuSchema);

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Routes

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const token = jwt.sign(
      { username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Error creating token", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all menu items
app.get("/api/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Add new menu item
app.post("/api/menu", authenticateAdmin, async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete menu item
app.delete("/api/menu/:id", authenticateAdmin, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update menu item
app.put("/api/menu/:id", authenticateAdmin, async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));