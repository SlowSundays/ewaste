
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the interface for the Product document
interface ProductDocument extends mongoose.Document {
  category: string;
  deviceName: string;
  modelNumber: string;
  brand: string;
 
  images: string[];
  grade: string;
  price: number;
  sellerId: string;
}

// Define the product schema
const productSchema = new Schema<ProductDocument>({
  category: { type: String, required: false },
  deviceName: { type: String, required: false },
  modelNumber: { type: String, required: false },
  brand: { type: String, required: false },

  images: [{ type: String }],
  grade: { type: String, required: false },
  price: { type: Number, required: false },
  sellerId: { type: String, required: false },
}, { timestamps: false});

// Create the product model
const Product = mongoose.model<ProductDocument>('Product', productSchema, 'products');
export default Product;