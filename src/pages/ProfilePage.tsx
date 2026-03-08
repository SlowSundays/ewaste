import React from "react";
import Navbar from "../components/Navbar";

export default function UserProfilePage() {
  // Example data
  const soldItems = [
    { name: "Laptop A", price: 2000, date: "2026-03-05" },
    { name: "Phone B", price: 1200, date: "2026-02-20" },
  ];

  const boughtItems = [
    { name: "Tablet X", price: 800, date: "2026-01-15" },
  ];

  const disposalRequests = [
    { date: "2026-03-10", items: ["TV C", "Laptop B"], status: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        {/* Sold Items */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Items Sold</h2>
          <div className="grid gap-4">
            {soldItems.map((item, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl shadow">
                <p className="font-semibold">{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Date Sold: {item.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bought Items */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Items Bought</h2>
          <div className="grid gap-4">
            {boughtItems.map((item, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl shadow">
                <p className="font-semibold">{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Date Bought: {item.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* E-Waste Disposal */}
        <section>
          <h2 className="text-xl font-semibold mb-4">E-Waste Disposal Requests</h2>
          <div className="grid gap-4">
            {disposalRequests.map((request, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl shadow">
                <p className="font-semibold">Pickup Date: {request.date}</p>
                <p>Items: {request.items.join(", ")}</p>
                <p>Status: {request.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}