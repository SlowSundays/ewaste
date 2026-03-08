import React, { useState, useEffect, useMemo } from 'react'; // 1. Added useEffect
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Define a TypeScript interface for your product
interface Product {
  _id: string; // MongoDB uses _id instead of id
  deviceName: string;
  brand: string;
  category: string;
  images: string[];
  price: number;
  grade: string;
}

export default function BrowsePage() {
  const navigate = useNavigate();
  
  // 2. State for real products from the database
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  // 3. Fetch products from your backend when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 4. Update filters to use database field names (deviceName, brand, etc.)
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

  if (loading) {
    return <div className="text-center mt-20">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by device name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="All">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="TV">TV</option>
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="All">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Dell">Dell</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <img
                // Use the first image in the array, or a placeholder if empty
                src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'}
                alt={product.deviceName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="font-bold text-lg mb-2">{product.deviceName}</h2>
                <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
                <p className="text-gray-600 mb-1">Category: {product.category}</p>
                <p className="text-teal-600 font-bold text-xl mb-4">${product.price}</p>
                
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No items found in the database.
          </div>
        )}
      </div>
    </div>
  );
}