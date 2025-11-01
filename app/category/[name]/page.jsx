"use client";

import React, { useState, useEffect } from "react";
import Filter from "@/components/sidebar/filter"; // مكون الفلترة الجانبي
import { useParams } from "next/navigation";
import Link from "next/link"; // مهم جداً
import { useAppContext } from '../../context/AppContext'; //علشان اقدر استخدم السلة 

const CategoryPage = () => {
  const params = useParams();
  const name = decodeURIComponent(params.name);
  const { addToCart } = useAppContext(); //علشان يجيب دالة الاضافة للسلة 

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
        <div className="flex flex-col items-center p-8 bg-white/90 rounded-2xl shadow-2xl border border-[#A2B4C0]/30 animate-pulse">
          <svg
            className="animate-spin h-10 w-10 text-[#D8C2A7]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
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
        <div className="p-8 max-w-lg mx-auto bg-[#2B1A0F] rounded-2xl shadow-3xl border border-[#A2B4C0]/50 text-center">
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

  const ProductCard = ({ product }) => {
    return (
      <div className="bg-[#101F30] rounded-2xl shadow-xl border border-transparent transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.03] hover:border-[#D8C2A7]/50">
        {/* صورة المنتج */}
        <div className="group relative bg-[#F3EEE8] flex items-center justify-center h-56 p-4 rounded-t-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-transparent to-transparent group-hover:from-black/10 group-hover:to-black/30 transition-opacity duration-500 pointer-events-none z-10"></div>
          <img
            src={product.image}
            alt={product.title}
            className="max-h-48 object-contain transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x300/101F30/A2B4C0?text=صورة+غير+متوفرة";
              e.target.className = "max-h-48 object-cover";
            }}
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-[#A2B4C0] line-clamp-2 mb-2 min-h-12">
            {product.title}
          </h3>
          <p className="text-[#D8C2A7] mb-2">
            {product.description.length > 80
              ? product.description.substring(0, 80) + "..."
              : product.description}
          </p>
          <p className="text-xl text-[#D8C2A7] font-extrabold mb-4">${product.price.toFixed(2)}</p>

          {/* زر التفاصيل */}
          <Link
            href={`/category/${encodeURIComponent(product.category)}/${product.id}`}
            className="w-full py-3 flex items-center justify-center gap-2 bg-[#A2B4C0] text-[#F3EEE8] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#D8C2A7] hover:text-[#101F30]"
          >
            تفاصيل المنتج
          </Link>

          {/* زر أضف للسلة */}
          <button
            onClick={() => addToCart(product.id.toString())} //علشان اول ما يضغط علي الزر تتضاف في السلة 
            className="mt-2 w-full py-3 flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8] group">
            أضف للسلة
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3EEE8] px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* فلتر المنتجات */}
        <div className="md:w-1/4 w-full">
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
          />
        </div>

        {/* قائمة المنتجات */}
        <div className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
