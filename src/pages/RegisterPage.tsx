import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, BatteryCharging, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Explicitly type formData state
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'user' | 'admin';  // Specify the role type as 'user' or 'admin'
  }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',  // Default role is 'user'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if password is strong enough
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Create a user object to simulate login
    const user = {
      name: formData.username,
      role: formData.role,  // role is either 'user' or 'admin'
      id: formData.email.split('@')[0], // Generate a unique ID based on the email prefix
    };

    // Pass the user object to the login function
    login(user);  // Ensure login function is expecting an object of this shape
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* LOGO SECTION */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
            <BatteryCharging className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm">Join the E-Waste Marketplace today</p>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-bold mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            Register Now <ArrowRight className="w-4 h-4" />
          </button>
        </form>

       <div className="mt-8 text-center text-sm text-gray-500">
  Already have an account? 
  <span 
    onClick={() => navigate('/')} 
    className="text-black font-bold cursor-pointer hover:underline"
  >
    Log in here
  </span>
</div>
      </div>
    </div>
  );
}