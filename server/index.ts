import express from 'express'; // Default import for express

import mongoose from 'mongoose'; // Import mongoose
import productRoutes from './routes/productRoutes.ts'; // Your product route file
import cors from 'cors'; // CORS middleware for cross-origin requests
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/products")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Start server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});