import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Heart, Recycle } from "lucide-react";

const products = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: "RM 2,500",
    location: "Kuala Lumpur",
    image:
      "https://images.unsplash.com/photo-1699265837122-7636e128b4b0?auto=format&fit=crop&q=80&w=1080",
    grade: "A",
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    price: "RM 5,800",
    location: "Penang",
    image:
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&q=80&w=1080",
    grade: "B",
  },
  {
    id: 3,
    name: "iPad Air",
    price: "RM 1,800",
    location: "Johor Bahru",
    image:
      "https://images.unsplash.com/photo-1714071803623-9594e3b77862?auto=format&fit=crop&q=80&w=1080",
    grade: "A",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const gradeStyles = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-700";
      case "B":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION (MATCHING ABOUT PAGE) */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <Recycle className="w-10 h-10" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Certified Graded Electronics
          </h1>

          <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto">
            Browse trusted, quality-graded electronics and give devices a second life.
          </p>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-2">Latest Listings</h2>
          <p className="text-gray-600">
            Professionally graded and ready for resale
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/product/${product.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/product/${product.id}`);
                  }
                }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-sm transition ${
                      isWishlisted
                        ? "bg-black text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>

                  {/* Grade Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${gradeStyles(
                      product.grade
                    )}`}
                  >
                    Grade {product.grade}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3">
                    {product.location}
                  </p>

                  <p className="text-xl font-bold text-teal-700">
                    {product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}