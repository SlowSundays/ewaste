const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');  // For unique file names

const app = express();
const upload = multer();  // For handling image file uploads in memory

// Image upload endpoint
app.post('/', upload.single('image'), async (req, res) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { public_id: `ewaste/${uuidv4()}`,
        folder: 'ewaste' }, // Optionally specify folder
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading image to Cloudinary', error });
        }
        res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url });
      }
    );

    // Create a readable stream from the buffer and pipe it to Cloudinary's upload stream
    result.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading image', error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});