import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext'; // 1. Import your auth hook
import { User, Package, ShoppingBag, Edit3, Mail, MapPin, Calendar, Loader2 } from 'lucide-react';

// Define the interface for your items
interface Product {
  _id: string;
  deviceName: string;
  price: number;
  images: string[];
  sellerId: string;
  status: string;
}

export default function UserProfile() {
  const { user } = useAuth(); // 2. Get the logged-in user object
  const [activeTab, setActiveTab] = useState('info');
  
  // State for dynamic data
  const [uploadedItems, setUploadedItems] = useState<Product[]>([]);
  const [boughtItems, setBoughtItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Fetch data from backend when the component loads
 useEffect(() => {
    const fetchUserData = async () => {
      // If user isn't loaded yet, don't stop the function, just wait.
      if (!user) {
        // If we've waited and still no user, stop loading so we can see the navbar
        setLoading(false); 
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/api/products');
        const allProducts: Product[] = await response.json();

        // Use || to handle both _id or id just in case
        const currentUserId = user._id || (user as any).id; 

        const myUploads = allProducts.filter(p => p.sellerId === currentUserId);
        setUploadedItems(myUploads);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* --- HERO HEADER (Using real user data) --- */}
      <div className="bg-teal-700 pt-16 pb-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              {/* Generate an avatar based on user name */}
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg"
              />
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl font-bold">{user?.name || "Guest User"}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 opacity-90">
                <span className="flex items-center gap-1 text-sm"><Mail className="w-4 h-4"/> {user?.email}</span>
                <span className="flex items-center gap-1 text-sm"><MapPin className="w-4 h-4"/> Location Pending</span>
                <span className="flex items-center gap-1 text-sm text-xs bg-teal-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  {user?.role} Account
                </span>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition shadow-md">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16">
        {/* TABS NAVIGATION */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex gap-2 mb-8">
          <button onClick={() => setActiveTab('info')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${activeTab === 'info' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
            <User className="w-5 h-5" /> Account Info
          </button>
          <button onClick={() => setActiveTab('uploaded')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${activeTab === 'uploaded' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
            <Package className="w-5 h-5" /> Uploaded Items ({uploadedItems.length})
          </button>
          <button onClick={() => setActiveTab('bought')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${activeTab === 'bought' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
            <ShoppingBag className="w-5 h-5" /> Bought Items
          </button>
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div className="pb-20">
          {activeTab === 'uploaded' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Items You're Selling</h2>
              {uploadedItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uploadedItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
                      <div className="relative h-48 bg-gray-100">
                        <img src={item.images[0] || 'https://via.placeholder.com/300'} alt={item.deviceName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{item.deviceName}</h3>
                        <p className="text-teal-600 font-bold text-xl mb-3">RM {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
                  You haven't uploaded any items yet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'info' && (
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-bold text-gray-500 uppercase tracking-tight mb-1">Full Name</label>
                       <div className="p-3 bg-gray-50 border rounded-lg text-gray-800 font-medium">{user?.name}</div>
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-500 uppercase tracking-tight mb-1">Email Address</label>
                       <div className="p-3 bg-gray-50 border rounded-lg text-gray-800 font-medium">{user?.email}</div>
                     </div>
                   </div>
                   <div className="p-6 bg-teal-50 rounded-xl border border-teal-100">
                      <h4 className="font-bold text-teal-800 mb-2">Security Note</h4>
                      <p className="text-sm text-teal-700 leading-relaxed">
                        Your account is currently protected. You can update your password or profile details by clicking the "Edit Profile" button above.
                      </p>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}