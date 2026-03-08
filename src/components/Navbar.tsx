import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Added UserCircle icon to the imports
import { Recycle, User, LogOut, LayoutDashboard, ChevronDown, BatteryCharging, UserCircle } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path ? 'font-bold border-b-2 border-black' : 'hover:underline';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    if (isMenuOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home')}>
        <div className="w-12 h-12 rounded-full border-4 border-black flex items-center justify-center bg-white">
          <BatteryCharging className="w-6 h-6 fill-black" />
        </div>
        <span className="font-bold text-lg hidden sm:block">E-Waste Marketplace</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex gap-6">
          <button type="button" onClick={() => navigate('/home')} className={isActive('/home')}>
            Home
          </button>
          <button type="button" onClick={() => navigate('/browse')} className={isActive('/browse')}>
            Browse
          </button>
          <button type="button" onClick={() => navigate('/about')} className={isActive('/about')}>
            About
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Disposal Button */}
          <button
            type="button"
            onClick={() => navigate('/disposal')}
            className="p-2 hover:bg-green-50 text-green-700 rounded-lg flex flex-col items-center group"
          >
            <Recycle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-bold">DISPOSAL</span>
          </button>

          {/* Sell Button */}
          <button
            type="button"
            onClick={() => navigate('/sell')}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-bold shadow-md"
          >
            SELL
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-1"
            >
              <User className="w-6 h-6" />
              <ChevronDown className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs text-gray-500 font-bold uppercase border-b border-gray-100">
                    Signed in as {user?.role}
                  </div>

                  {/* --- NEW PROFILE LINK --- */}
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50"
                  >
                    <UserCircle className="w-4 h-4 text-gray-500" />
                    My Profile
                  </button>

                  {/* Admin Panel (if user is an admin) */}
                  {user?.role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/admin');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-500" />
                      Admin Panel
                    </button>
                  )}

                  {/* Log Out */}
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}

            {isMenuOpen && <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setIsMenuOpen(false)} />}
          </div>
        </div>
      </div>
    </nav>
  );
}