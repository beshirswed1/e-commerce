"use client";

import React, { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";
import CategoryItem from "./CategoryItem";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // 🔥 للتحكم في الفتح والإغلاق

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        // const res = await fetch("http://localhost:7118/api/Categories?languageCode=ar&isActive=true");

        const data = await res.json();
        const apiCategories = [...new Set(data.map((item) => item.category))];
        // const apiCategories = data.data.map((item) => item.title);


        setCategories(apiCategories);
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      {/* 🔘 زر الفتح للجوال */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-16 left-6 z-50 bg-[#E6CBA8] text-black p-2 rounded-full shadow-md hover:scale-105 transition-all"
      >
        <Menu size={22} />
      </button>

      {/* 🔲 الشريط الجانبي */}
      <nav
        className={`fixed top-0 md:left-0 h-full md:w-64 w-72 z-50 md:p-5 p-3 shadow-2xl mt-15 border-r border-[#E6CBA833] flex flex-col space-y-3 overflow-y-auto transition-all duration-500 ease-in-out backdrop-blur-xl
          ${isOpen ? "left-0" : "-left-80 md:left-0"} 
        `}
        style={{
          background:
            "linear-gradient(135deg, rgba(183,199,214,0.45), rgba(230,203,168,0.25))",
          boxShadow:
            "inset 0 0 0.5px rgba(255,255,255,0.3), 0 8px 25px rgba(0,0,0,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "0 18px 18px 0",
        }}
      >
        {/* 🔘 زر الإغلاق في الجوال */}
        <div className="flex  justify-between items-center md:hidden mb-3">
          <span
            className="text-[#E6CBA8] font-bold text-xl"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
          >
            Categories
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#E6CBA8] text-black p-2 rounded-full shadow-md hover:scale-110 transition-all"
          >
            <X size={20}  />
          </button>
        </div>

        {/* 🔹 العنوان في الشاشات الكبيرة */}
        <div
          className="hidden md:block text-[#E6CBA8] font-bold text-2xl border-b border-[#E6CBA833] pb-2 mb-3"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.25)" }}
        >
          Categories
        </div>

        {/* 🔄 حالة التحميل */}
        {loading ? (
          <div className="text-[#E6CBA8] animate-pulse text-center mt-2">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="text-[#E6CBA8] font-semibold mt-2">
            Failed to load categories.
          </div>
        ) : (
          <ul
            className="flex flex-col space-y-2 mt-2"
            style={{
              justifyContent: "center",
              alignItems: "stretch",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {categories.slice(0, 10).map((cat, index) => (
              <CategoryItem
                key={index}
                name={cat}
                hoverColor="#E6CBA8"
                textColor="#3A3A3A"
                borderColor="#E6CBA8"
                style={{
                  fontSize: "0.85rem",
                  padding: "6px 10px",
                  borderRadius: "8px",
                }}
              />
            ))}
          </ul>
        )}
      </nav>

      {/* 🖤 خلفية عند فتح القائمة في الجوال */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0   z-40 md:hidden transition-opacity duration-300"
        ></div>
      )}

      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-color-scheme: dark) {
          nav {
            background: linear-gradient(
              135deg,
              rgba(30, 30, 30, 0.6),
              rgba(50, 50, 50, 0.4)
            );
            border-color: rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </>
  );
}
