// components/Sidebar.jsx
import React from "react";
import CategoryItem from "./CategoryItem";

async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Sidebar() {
  const categories = await fetchCategories();

  return (
    <nav className="flex flex-col w-64 h-screen bg-gray-900 text-white p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Categories</h2>
      {categories.length === 0 ? (
        <div>Failed to load categories.</div>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <CategoryItem key={index} name={cat} />
          ))}
        </ul>
      )}
    </nav>
  );
}
