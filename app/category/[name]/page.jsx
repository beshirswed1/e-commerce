"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const name = decodeURIComponent(params.name); // فك الترميز بتاع الكاتوجري

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const filtered = data.filter((item) => item.category === name);
        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-indigo-600 animate-pulse">
        جاري تحميل المنتجات...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-lg">
        حصلت مشكلة في تحميل المنتجات 
      </div>
    );

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 capitalize">
        {name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* الصورة */}
            <div className="bg-gray-100 flex items-center justify-center h-56">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-48 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* التفاصيل */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                {item.title}
              </h3>
              <p className="text-indigo-600 font-bold mb-3">${item.price}</p>

              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200">
                أضف للسلة 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
