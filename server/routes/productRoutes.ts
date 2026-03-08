import express from 'express';
import Product from '../models/Product.ts';  // Assuming Product model exists
import cors from 'cors';

// Initialize the express router
const router = express.Router();

// CORS options to allow all origins
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

router.use(cors(corsOptions));

// POST route to add a new product
router.post("/", async (req, res) => {
  // Destructure the incoming request body
  const { category, deviceName, modelNumber, brand, grade, price, sellerId, images } = req.body;

  // Check if all required fields are provided
  if (!category || !deviceName || !modelNumber || !brand || !price || !sellerId || !images) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new Product instance
  const newProduct = new Product({
    category,
    deviceName,
    modelNumber,
    brand,
    grade,
    price,
    sellerId,
    images // Images from Cloudinary or other sources
  });

  // Save the new product to the database
  await newProduct.save();

  // Send a success response
  res.json({ message: 'Product listed successfully' });
});

// GET route to fetch all products
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    
    // Send the products data in response
    res.json(products);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;