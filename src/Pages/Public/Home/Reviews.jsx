import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function App() {
  const [showAll, setShowAll] = useState(false);

  // ==============================
  // FAKE REVIEWS JSON (10)
  // ==============================
  const reviews = [
    {
      id: 1,
      name: "John Carter",
      review:
        "You always get fast, friendly support in record time. Much faster than the competition.",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      id: 2,
      name: "Emma Watson",
      review:
        "Amazing experience! The team was responsive and professional throughout.",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      id: 3,
      name: "Michael Brown",
      review:
        "Customer service exceeded my expectations. Very reliable support.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      name: "Sophia Lee",
      review:
        "Quick response time and friendly assistance. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 5,
      name: "David Miller",
      review:
        "Professional support team with excellent communication skills.",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      id: 6,
      name: "Olivia Garcia",
      review:
        "Support was fast and helpful. I felt valued as a customer.",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 7,
      name: "Daniel Wilson",
      review:
        "Reliable service with impressive response time. Will use again.",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
    },
    {
      id: 8,
      name: "Ava Thompson",
      review:
        "Friendly team and very efficient support. Loved the experience.",
      image: "https://randomuser.me/api/portraits/women/81.jpg",
    },
    {
      id: 9,
      name: "Chris Anderson",
      review:
        "Top-notch customer care. Everything was handled smoothly.",
      image: "https://randomuser.me/api/portraits/men/91.jpg",
    },
    {
      id: 10,
      name: "Mia Rodriguez",
      review:
        "Excellent support! Fast replies and clear solutions.",
      image: "https://randomuser.me/api/portraits/women/95.jpg",
    },
  ];

  // show only 4 initially
  const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      {/* ==============================
          HEADER
      ============================== */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Reviews
      </h1>
      <p className="text-center text-gray-500 mb-12">
        You always get fast, friendly support in record time
        <br />
        (much faster than the competition).
      </p>

      {/* ==============================
          REVIEWS GRID
      ============================== */}
      <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleReviews.map((item) => (
          <div
            key={item.id}
            className="group relative h-72 rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer"
          >
            {/* DEFAULT CARD */}
            <div className="absolute inset-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
              <FaQuoteLeft className="text-indigo-600 text-3xl mb-4" />

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.review}
              </p>

              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800">
                  {item.name}
                </span>
              </div>
            </div>

            {/* HOVER CARD */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-indigo-900/70" />

              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-sm leading-relaxed">
                  {item.review}
                </p>
                <span className="block mt-3 font-semibold">
                  — {item.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==============================
          SEE MORE BUTTON
      ============================== */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      </div>
    </div>
  );
}
