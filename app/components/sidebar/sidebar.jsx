// components/Sidebar.jsx
import React from "react";
import CategoryItem from "./CategoryItem";

async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    // الكاتيجوريز الأصلية من الـ API
    const apiCategories = [...new Set(data.map((item) => item.category))];

    // كاتيجوريز إضافية يدويًا
    const extraCategories = ["fashion", "books", "furniture", "smartphones"];

    // ندمجهم مع بعض بدون تكرار
    const allCategories = [...new Set([...apiCategories, ...extraCategories])];

    return allCategories;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Sidebar() {
  const categories = await fetchCategories();

  return (
    <nav className="bg-linear-to-b from-gray-900 to-gray-800 text-white md:w-64 w-full md:h-screen p-5 flex md:flex-col flex-row md:space-y-4 space-x-2 md:space-x-0 overflow-x-auto">
      <div className="flex items-center justify-between md:mb-4 md:border-b border-gray-700 pb-2">
        <h2 className="text-2xl font-bold md:block hidden">Categories</h2>
        <h2 className="text-xl font-bold md:hidden block">Cats</h2>
      </div>

      {categories.length === 0 ? (
        <div>Failed to load categories.</div>
      ) : (
        <ul className="md:space-y-2 flex md:flex-col flex-row gap-3">
          {categories.map((cat, index) => (
            <CategoryItem key={index} name={cat} />
          ))}
        </ul>
      )}
    </nav>
  );
}
