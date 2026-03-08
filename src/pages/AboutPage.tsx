import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Recycle, ShoppingBag, Globe, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-20">
        <main className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block p-6 rounded-full bg-white shadow-xl mb-8">
            <Globe className="w-16 h-16 text-teal-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            The Future of E-Waste Management
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            E-Waste Marketplace is your trusted platform for selling used electronics or scheduling eco-friendly disposal.
          </p>
        </main>
      </div>

      {/* Two Pillars Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Marketplace Column */}
          <div className="p-8 border-2 border-gray-100 rounded-2xl hover:border-teal-700 transition-all group shadow-lg">
            <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
              <ShoppingBag className="w-8 h-8 text-teal-700" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Marketplace</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Recycle your electronics in a trusted marketplace. List your devices, get the best value, and connect with buyers directly.
            </p>
            <button 
              onClick={() => navigate('/browse')}
              className="flex items-center font-semibold text-teal-700 border-b-2 border-teal-700 pb-1 hover:text-teal-500 transition-colors"
            >
              Browse Items <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Disposal Column */}
          <div className="p-8 border-2 border-gray-100 rounded-2xl hover:border-orange-700 transition-all group shadow-lg">
            <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
              <Recycle className="w-8 h-8 text-orange-700" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Responsible Disposal</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Not everything can be sold, but all electronics deserve responsible recycling. Schedule a pickup for items to be recycled eco-friendly.
            </p>
            <button 
              onClick={() => navigate('/disposal')}
              className="flex items-center font-semibold text-orange-700 border-b-2 border-orange-700 pb-1 hover:text-orange-500 transition-colors"
            >
              Schedule Pickup <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

        </div>
      </div>

      {/* Stats / Trust Section */}
      <div className="bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 text-teal-400">2.5k+</div>
              <div className="text-gray-300">Items Recycled</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-teal-400">1.2k+</div>
              <div className="text-gray-300">Happy Sellers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-teal-400">100%</div>
              <div className="text-gray-300">Eco-Friendly</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}