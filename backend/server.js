// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
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

// Routes

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
app.post("/api/menu", async (req, res) => {
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
app.delete("/api/menu/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update menu item
app.put("/api/menu/:id", async (req, res) => {
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
