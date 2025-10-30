"use client";

import React, { useState, useEffect } from "react";
import Filter from "@/components/sidebar/filter"; // مكونك الفعلي
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const name = decodeURIComponent(params.name);

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
  const matchesRating = item.rating?.rate >= minRating; // assuming the API has `rating.rate`
  return matchesSearch && matchesPrice && matchesRating;
});

  return (
    <div
      className="min-h-screen p-4 sm:p-8 md:p-12"
      style={{
        background: "linear-gradient(180deg, #101F30 0%, #A2B4C0 50%, #F3EEE8 100%)",
        fontFamily: "Poppins, Inter, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="py-10 mb-8 border-b-2 border-[#A2B4C0]/50">
          <h1 className="text-4xl md:text-5xl font-extrabold capitalize text-[#F3EEE8] drop-shadow-lg">
            فئة: <span className="text-[#D8C2A7]">{name.replace(/-/g, " ")}</span>
          </h1>
          <p className="text-xl mt-2 text-[#A2B4C0]">اكتشف أحدث المنتجات في هذه الفئة.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
          />


          {/* شبكة المنتجات */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#101F30] rounded-2xl shadow-xl border border-transparent transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.03] hover:border-[#D8C2A7]/50"
                >
                  {/* الصورة */}
                  <div className="group relative bg-white flex items-center justify-center h-56 p-4 rounded-t-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/10 group-hover:to-black/30 transition-opacity duration-500 pointer-events-none z-10"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-48 object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x300/101F30/A2B4C0?text=صورة+غير+متوفرة";
                        e.target.className = "max-h-48 object-cover";
                      }}
                    />
                  </div>

                  {/* التفاصيل */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-[#A2B4C0] line-clamp-2 mb-2 min-h-[3rem]">
                      {item.title}
                    </h3>
                    <p className="text-xl text-[#D8C2A7] font-extrabold mb-4">${item.price.toFixed(2)}</p>

                    <button className="w-full py-3 flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8] group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.44C4.68 15.7 5.58 17 7 17h11c1.1 0 2-.9 2-2s-.9-2-2-2H7l1.1-2h8.65c.37 0 .7-.25.84-.63l3.05-7.64L23 4H5.21c-.45-1.12-1.63-2-3.04-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                      أضف للسلة
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;