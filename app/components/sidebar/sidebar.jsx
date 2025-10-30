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
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white md:w-64 w-full md:h-screen p-5 flex md:flex-col flex-row md:space-y-4 space-x-2 md:space-x-0 shadow-lg overflow-hidden"
      style={{
        overflowY: "auto",
        scrollbarWidth: "none", // لإخفاء سكرول في فايرفوكس
        msOverflowStyle: "none", // لإخفاء في إنترنت إكسبلورر
      }}
    >
      {/* إخفاء سكرول فعليًا */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* العنوان */}
      <div className="flex items-center justify-between md:mb-4 md:border-b border-gray-700 pb-2">
        <h2 className="text-2xl font-bold md:block hidden tracking-wide">Categories</h2>
        <h2 className="text-xl font-bold md:hidden block">Cats</h2>
      </div>

      {/* الحالة أثناء التحميل */}
      {loading ? (
        <div className="text-gray-400 animate-pulse">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-red-400">Failed to load categories.</div>
      ) : (
        <ul className="md:space-y-2 flex md:flex-col flex-row md:gap-2 gap-3">
          {categories.slice(0, 10).map((cat, index) => (
            <CategoryItem key={index} name={cat} />
          ))}
        </ul>
      )}
    </nav>
  );
}
