import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Recycle, ChevronLeft, ChevronRight, Calendar, User, Phone, CheckCircle2 } from 'lucide-react';

export default function DisposalPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: ''
  });
  
  // Get current date info
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a pickup date.");
      return;
    }
    alert(`Pickup scheduled for ${selectedDate} ${months[currentMonth]} ${currentYear}`);
    navigate('/home');
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md mb-6 border-2 border-black">
            <Recycle className="w-12 h-12 text-black" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">E-Waste Disposal Request</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Schedule a free pickup for your large electronic items or bulk recycling. We ensure responsible disposal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: User Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</span>
                Contact Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                      placeholder="+60 12-345 6789"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Date Summary */}
            <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
               <h3 className="font-bold text-teal-800 mb-1">Selected Pickup Date</h3>
               {selectedDate ? (
                 <div className="flex items-center gap-2 text-2xl font-bold text-teal-900">
                    <Calendar className="w-6 h-6" />
                    {selectedDate} {months[currentMonth]} {currentYear}
                 </div>
               ) : (
                 <p className="text-teal-600/70 text-sm">Please select a date from the calendar</p>
               )}
            </div>

             <button
                type="submit"
                className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                Confirm Pickup <CheckCircle2 className="w-5 h-5" />
              </button>
          </div>

          {/* Right Column: Calendar */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">2</span>
                Select a Date
              </h2>

            {/* --- UPDATED CALENDAR CONTAINER (Now White & Clean) --- */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"> 
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="font-bold text-lg">
                  {months[currentMonth]} {currentYear}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-bold text-gray-400 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDate(day);
                          setFormData({ ...formData, date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` });
                        }}
                        className={`w-full h-full flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          selectedDate === day
                            ? 'bg-black text-white shadow-md scale-105'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}