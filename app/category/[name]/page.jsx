"use client";

import React, { useState, useEffect } from "react";
import Filter from "@/components/sidebar/filter";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppContext } from '../../context/AppContext';

const CategoryPage = () => {
  const params = useParams();
  const name = decodeURIComponent(params.name);
  const { addToCart } = useAppContext();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);

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
      <div className="flex items-center justify-center min-h-screen bg-[#F3EEE8]">
        <div className="flex flex-col items-center p-8 bg-white/90 rounded-3xl shadow-2xl animate-pulse">
          <svg
            className="animate-spin h-12 w-12 text-[#D8C2A7]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-4 text-xl font-semibold text-[#101F30]">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F3EEE8]">
        <div className="p-8 max-w-lg mx-auto bg-[#2B1A0F] rounded-3xl shadow-2xl text-center border border-[#A2B4C0]/50">
          <h2 className="text-3xl font-extrabold text-[#D8C2A7] mb-4">❌ خطأ في التحميل ❌</h2>
          <p className="text-lg text-[#A2B4C0]">
            حصلت مشكلة أثناء محاولة جلب المنتجات من الخادم. يرجى التحقق من اتصالك بالإنترنت.
          </p>
        </div>
      </div>
    );

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.price <= priceRange;
    const matchesRating = item.rating?.rate >= minRating;
    return matchesSearch && matchesPrice && matchesRating;
  });

  const ProductCard = ({ product }) => (
    <div className="bg-[#101F30] rounded-3xl shadow-lg border border-transparent transform transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:rotate-1 will-change-transform">
      <div className="group relative bg-[#F3EEE8] flex items-center justify-center h-60 p-4 rounded-t-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
        <img
          src={product.image}
          alt={product.title}
          className="max-h-48 sm:max-h-52 md:max-h-56 lg:max-h-60 object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x300/101F30/A2B4C0?text=صورة+غير+متوفرة";
            e.target.className = "max-h-48 object-cover";
          }}
        />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-semibold text-lg sm:text-lg md:text-xl lg:text-xl text-[#A2B4C0] line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]">{product.title}</h3>
        <p className="text-[#D8C2A7] line-clamp-3 sm:line-clamp-4">{product.description}</p>
        <p className="text-xl sm:text-xl md:text-2xl font-extrabold text-[#D8C2A7]">${product.price.toFixed(2)}</p>
        <Link
          href={`/category/${encodeURIComponent(product.category)}/${product.id}`}
          className="w-full py-3 text-center bg-[#A2B4C0] text-[#F3EEE8] rounded-xl font-bold shadow-md hover:bg-[#D8C2A7] hover:text-[#101F30] transition-colors duration-300"
        >
          تفاصيل المنتج
        </Link>
        <button
          onClick={() => addToCart(product.id.toString())}
          className="w-full py-3 mt-2 text-center bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold shadow-md hover:bg-[#A2B4C0] hover:text-[#F3EEE8] transition-colors duration-300"
        >
          أضف للسلة
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3EEE8] px-4 md:px-8 lg:px-12 py-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
          />
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="text-center text-[#101F30] col-span-full mt-10">
              لا توجد منتجات مطابقة للمعايير المحددة.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
