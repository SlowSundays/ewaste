import React, { useState, useRef } from "react";
import { UploadCloud, X, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SellPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [brand, setBrand] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [answers, setAnswers] = useState({
    working: null as boolean | null,
    screen: null as boolean | null,
    ports: null as boolean | null,
    speakers: null as boolean | null
  });

  const categories = ["Mobile", "Laptop", "TV", "Tablet"];
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsUploading(true);
    const files = Array.from(e.target.files);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: formData }
          );
          const data = await res.json();
          return data.secure_url;
        })
      );
      setImages(prev => [...prev, ...uploaded]);
    } catch (err) {
      alert("Upload failed. Check Cloudinary settings.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnswer = (key: keyof typeof answers, value: boolean) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const weights = { working: 40, screen: 25, ports: 20, speakers: 15 };
  const score = Object.entries(answers).reduce((total, [key, value]) => {
    if (value === true) return total + weights[key as keyof typeof weights];
    return total;
  }, 0);

  let grade = "F";
  if (score >= 90) grade = "A";
  else if (score >= 75) grade = "B";
  else if (score >= 60) grade = "C";
  else if (score >= 40) grade = "D";

  const basePriceMap: any = { Mobile: 1800, Laptop: 3500, TV: 2500, Tablet: 1200 };
  const basePrice = selectedCategory ? basePriceMap[selectedCategory] : 1500;
  const gradeMultiplier: any = { A: 1, B: 0.8, C: 0.6, D: 0.4, F: 0.2 };
  const price = Math.round(basePrice * gradeMultiplier[grade]);

  const submitSell = async () => {
    const productData = {
      category: selectedCategory,
      deviceName,
      modelNumber,
      brand,
      images,
      grade,
      price,
      sellerId: user ? user._id : "", 
    };

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
      
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // --- ADD THIS LINE TO BYPASS NGROK WARNING ---
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        alert("Device Listed Successfully!");
        navigate('/browse');
      } else {
        alert("Server returned an error. Make sure backend is running.");
      }
    } catch (err) {
      alert("Failed to connect to server. Check your ngrok tunnel.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-teal-700 text-white py-14 text-center">
        <h1 className="text-3xl font-bold">List Your Device</h1>
        <p className="mt-2 opacity-80">Get the best value for your electronics</p>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* STEP 0: INFO */}
        {step === 0 && (
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Basic Information</h2>
            
            <label className="block text-sm font-bold text-gray-500 uppercase mb-3">Select Category</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-3 px-2 border-2 rounded-xl font-bold transition-all ${
                    selectedCategory === cat ? "border-teal-600 bg-teal-50 text-teal-700" : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <input
                placeholder="Device Name (e.g. iPhone 15 Pro)"
                value={deviceName}
                onChange={e => setDeviceName(e.target.value)}
                className="w-full p-4 bg-gray-50 border rounded-xl focus:border-teal-600 focus:bg-white focus:outline-none transition-all"
              />
              <input
                placeholder="Model Number"
                value={modelNumber}
                onChange={e => setModelNumber(e.target.value)}
                className="w-full p-4 bg-gray-50 border rounded-xl focus:border-teal-600 focus:bg-white focus:outline-none transition-all"
              />
              <input
                placeholder="Brand"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                className="w-full p-4 bg-gray-50 border rounded-xl focus:border-teal-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <button
              disabled={!deviceName || !selectedCategory}
              onClick={() => setStep(1)}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold mt-8 flex items-center justify-center gap-2 hover:bg-teal-700 disabled:bg-gray-200 transition-all"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 1: IMAGES */}
        {step === 1 && (
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Visual Proof</h2>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-12 text-center rounded-2xl cursor-pointer transition-all ${
                isUploading ? "bg-gray-50 border-gray-200" : "border-teal-200 hover:border-teal-500 bg-teal-50/30"
              }`}
            >
              <UploadCloud className={`mx-auto mb-4 w-12 h-12 ${isUploading ? 'animate-bounce text-gray-300' : 'text-teal-600'}`} />
              <p className="font-bold text-gray-700">{isUploading ? 'Uploading...' : 'Click to Upload Device Photos'}</p>
              <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              <input ref={fileInputRef} type="file" hidden multiple onChange={handleUpload} />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                  <img src={img} className="w-full h-full object-cover" alt="upload" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-10">
              <button onClick={() => setStep(0)} className="text-gray-500 font-bold hover:text-black flex items-center gap-1">
                <ChevronLeft className="w-5 h-5"/> Back
              </button>
              <button
                disabled={images.length === 0}
                onClick={() => setStep(2)}
                className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 disabled:bg-gray-200 transition-all flex items-center gap-2"
              >
                Condition Test <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CONDITION */}
        {step === 2 && (
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Condition Assessment</h2>

            <div className="space-y-6">
              {Object.keys(answers).map(key => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <p className="font-bold text-gray-700 capitalize">{key}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(key as any, true)}
                      className={`px-6 py-2 rounded-lg font-bold transition-all ${
                        answers[key as keyof typeof answers] === true ? "bg-green-600 text-white" : "bg-white border text-gray-400"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleAnswer(key as any, false)}
                      className={`px-6 py-2 rounded-lg font-bold transition-all ${
                        answers[key as keyof typeof answers] === false ? "bg-red-600 text-white" : "bg-white border text-gray-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-teal-900 text-white rounded-2xl flex justify-between items-center shadow-xl">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-teal-300">Estimated Grade</p>
                <p className="text-5xl font-black">Grade {grade}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest font-bold text-teal-300">Listing Price</p>
                <p className="text-4xl font-black text-teal-100">${price}</p>
              </div>
            </div>

            <div className="flex justify-between mt-10">
              <button onClick={() => setStep(1)} className="text-gray-500 font-bold hover:text-black">Back</button>
              <button
                onClick={submitSell}
                className="bg-teal-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-700 shadow-lg flex items-center gap-2"
              >
                List Item <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}