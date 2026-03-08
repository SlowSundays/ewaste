import React, { useState, useRef, useEffect } from "react";

import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  Star,
  ChevronLeft,
  Truck,
  Smartphone
} from 'lucide-react';

export default function BuyPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // In a real app, you'd fetch data using this ID

  // Mock Data for the selected item (e.g., iPhone 13 Pro)
  const product = {
    id: id || 1,
    title: 'iPhone 13 Pro 256GB - Sierra Blue',
    price: 'RM 2,500',
    originalPrice: 'RM 4,899',
    grade: 'A',
    description: 'Device is in excellent condition. No scratches on screen or body. Battery health is at 92%. Comes with original box and charging cable. Used for 1 year.',
    location: 'Kuala Lumpur, Malaysia',
    postedDate: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1699265837122-7636e128b4b0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&q=80&w=1000'
    ],
    specs: [
      { label: 'Storage', value: '256GB' },
      { label: 'Battery Health', value: '92%' },
      { label: 'Color', value: 'Sierra Blue' },
      { label: 'Warranty', value: '1 Month' },
    ],
    seller: {
      name: 'Alex Tan',
      joined: 'Joined 2021',
      rating: 4.8,
      reviews: 124
    }
  };

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Breadcrumb / Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Grade Badge */}
              <div className="absolute top-4 left-4 bg-black text-white px-4 py-1.5 font-bold rounded-lg text-lg shadow-lg">
                Grade {product.grade}
              </div>

              {/* Action Buttons */}
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Details */}
          <div className="flex flex-col h-full">
            
            {/* Header Info */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>
                <button className="text-gray-400 hover:text-black">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
                <span>•</span>
                <span>{product.postedDate}</span>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-black">{product.price}</span>
                <span className="text-xl text-gray-400 line-through mb-1">{product.originalPrice}</span>
              </div>
            </div>

            {/* Seller Info Box */}
            <div className="bg-gray-50 rounded-xl p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {product.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{product.seller.name}</p>
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{product.seller.rating} ({product.seller.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-white transition-colors">
                View Profile
              </button>
            </div>

            {/* Description & Specs */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <h3 className="font-bold text-lg mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Buyer Protection</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Nationwide Delivery</span>
              </div>
            </div>

            {/* Action Buttons (Sticky at bottom on mobile if needed) */}
            <div className="mt-auto flex gap-4">
              <button className="flex-1 bg-white border-2 border-black text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-5 h-5" />
                Chat with Seller
              </button>
              <button 
                onClick={() => alert("Proceeding to checkout...")}
                className="flex-[2] bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Buy Now
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}