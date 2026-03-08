import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Search, Filter, AlertCircle, Loader2 } from 'lucide-react';

interface Product {
  _id: string; 
  deviceName: string;
  brand: string;
  category: string;
  images: string[];
  price: number;
  grade: string;
}

export default function BrowsePage() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        // Added headers to bypass ngrok warning and ensure JSON response
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error('Could not connect to the marketplace server.');
        
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.deviceName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Explore Marketplace</h1>
          <p className="text-gray-500 font-medium">Find quality pre-owned electronics at great prices.</p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by device name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-teal-500 border-2 rounded-xl outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-600 outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="TV">TV</option>
                <option value="Tablet">Tablet</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-600 outline-none"
              >
                <option value="All">All Brands</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Sony">Sony</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-teal-600">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-bold animate-pulse text-gray-400">Syncing with server...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-red-900 font-bold text-lg mb-2">Connection Issue</h3>
            <p className="text-red-700 text-sm mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Try Reconnecting
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden group"
              >
                <div className="h-60 bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400?text=No+Image'}
                    alt={product.deviceName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-black tracking-widest shadow-lg uppercase">
                    Grade {product.grade}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="font-black text-xl text-gray-900 group-hover:text-teal-600 transition-colors truncate">
                      {product.deviceName}
                    </h2>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-tighter">{product.brand} • {product.category}</p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">Price</span>
                      <span className="text-2xl font-black text-gray-900">RM {product.price}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-100"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-gray-200 mb-4 flex justify-center">
               <Search className="w-16 h-16" />
            </div>
            <p className="text-gray-500 font-bold text-lg">No items match your search filters.</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setSelectedBrand('All');}}
              className="mt-4 text-teal-600 font-black hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}