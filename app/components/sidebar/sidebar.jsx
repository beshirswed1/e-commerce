"use client";

import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        // جلب الكاتيجوريز فقط من الـ API بدون إضافات يدوية
        const apiCategories = [...new Set(data.map((item) => item.category))];
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
    <nav
      className="bg-[#101F30] text-[#F3EEE8] md:w-64 w-full md:h-screen p-5 mt-15 flex md:flex-col flex-row md:space-y-4 space-x-2 md:space-x-0 shadow-lg fixed top-0 left-0 overflow-y-auto scrollbar-hide z-50"
    >
      {/* إخفاء السكّروول في Webkit */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* العنوان */}
      <div className="flex items-center justify-between md:mb-4 border-b border-[#E6CBA8] pb-2">
        <h2 className="text-2xl font-bold md:block hidden tracking-wide text-[#E6CBA8]">
          Categories
        </h2>
        <h2 className="text-xl font-bold md:hidden block">Cats</h2>
      </div>

      {/* حالة التحميل أو عدم وجود بيانات */}
      {loading ? (
        <div className="text-[#A2B4C0] animate-pulse mt-2">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-[#E6CBA8] font-semibold mt-2">
          Failed to load categories.
        </div>
      ) : (
        <ul className="md:space-y-2 flex md:flex-col flex-row md:gap-2 gap-3 mt-2">
          {categories.slice(0, 10).map((cat, index) => (
            <CategoryItem
              key={index}
              name={cat}
              className="hover:bg-[#D8C2A7]/15 transition-colors duration-300 ease-in-out"
            />
          ))}
        </ul>
      )}
    </nav>
  );
}