import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, BatteryCharging } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'admin') {
      // Simple hardcoded admin login
      if (password === 'admin123') {
        login({
          _id: 'admin_id_001',      // Updated: changed 'id' to '_id'
          name: 'Admin User',
          email: 'admin@ewaste.com', // Updated: added 'email'
          role: 'admin',
        });
        navigate('/home'); // Tip: Navigating to home allows you to see the Navbar immediately
      } else {
        alert('Wrong Admin Password! Try: admin123');
      }
    } else {
      // Regular user login
      login({
        _id: email.split('@')[0],    // Updated: changed 'id' to '_id'
        name: email.split('@')[0],
        email: email,                // Updated: added 'email'
        role: 'user',
      });
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
            <BatteryCharging className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Login</h1>
          <p className="text-gray-500 text-sm italic">E-Waste Marketplace</p>
        </div>

        {/* User/Admin Toggle */}
        <div className="flex mb-8 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('user')}
            className={`w-1/2 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'user' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`w-1/2 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'admin' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-teal-600 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-teal-600 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 active:scale-[0.98] transition-all shadow-lg shadow-teal-100 mt-4"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          New to the platform?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-teal-600 font-bold cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );
}