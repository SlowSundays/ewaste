// config/cloudinary.js

// Cloudinary configuration for Vite environment (client-side)
const cloudinary = require('cloudinary').v2;
require('dotenv').config();  // Load environment variables

// Configure cloudinary with Vite environment variables
cloudinary.config({
  cloud_name: import.meta.env.VITE_CLOUD_NAME,  // Use Vite prefixed env variable
  api_key: import.meta.env.VITE_CLOUD_API_KEY,  // Use Vite prefixed env variable
  api_secret: import.meta.env.VITE_CLOUD_API_SECRET,
  upload_preset: import.meta.env.VITE_UPLOAD_PRESET,
  cloudinaryUrl: import.meta.env.CLOUDINARY_URL, // Use Vite prefixed env variable
});

module.exports = cloudinary;