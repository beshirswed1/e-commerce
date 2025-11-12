"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from '../../../context/AppContext';
import { FaStar, FaRegStar, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export default function ProductsDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useAppContext();
  const { productsDetails } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const foundProduct = data.find(
          (item) => item.id === Number(productsDetails)
        );
        if (foundProduct) setProduct(foundProduct);
        else setError(true);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productsDetails]);

  const handleAddToCart = () => {
    addToCart(product.id.toString());
    toast.success("تم إضافة المنتج إلى السلة");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط المنتج");
    }
  };

 const ratingStars = useMemo(() => {
  if (!product?.rating) return [];
  const fullStars = Math.floor(product.rating.rate);
  const emptyStars = 5 - fullStars;

  return [
    ...Array(fullStars).fill(0).map((_, i) => (
      <FaStar key={`full-${i}`} className="text-yellow-400" />
    )),
    ...Array(emptyStars).fill(0).map((_, i) => (
      <FaRegStar key={`empty-${i}`} className="text-gray-300" />
    ))
  ];
}, [product]);


  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F3EEE8] to-[#E8E3DD]">
        <div className="p-8 bg-white/90 rounded-3xl shadow-xl animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#D8C2A7] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-[#101F30]">
            جاري تحميل تفاصيل المنتج...
          </p>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="flex items-center justify-center  min-h-screen bg-[#F3EEE8]">
        <div className="p-8 max-w-lg mx-auto bg-[#2B1A0F] rounded-3xl shadow-2xl border border-[#A2B4C0]/50 text-center">
          <h2 className="text-3xl font-extrabold text-[#D8C2A7] mb-4">
            المنتج غير موجود أو فشل في التحميل
          </h2>
          <p className="text-lg text-[#A2B4C0] mb-6">
            تحقق من الرابط أو اتصالك بالإنترنت وحاول مرة أخرى.
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-[#A2B4C0] text-[#101F30] font-bold rounded-xl hover:bg-[#D8C2A7] hover:text-[#F3EEE8] transition-all"
          >
            <FaArrowLeft className="inline-block mr-2" />
            العودة
          </button>
        </div>
      </div>
    );

  return (<><Navbar />
    <main className="min-h-screen mt-14 bg-gradient-to-b from-[#F3EEE8] to-[#E8E3DD] flex flex-col items-center p-6">
      {/* Breadcrumb */}
      <nav className="self-start mb-4 text-sm text-[#A2B4C0] flex gap-2">
        <span className="cursor-pointer hover:underline" onClick={() => router.back()}>
          الفئة
        </span>
        <span> / </span>
        <span>{product.title}</span>
      </nav>

      {/* المنتج */}
      <section className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#A2B4C0]/30 transition-all">
        {/* صورة المنتج */}
        <div className="md:w-1/2 bg-[#F3EEE8] p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-96 object-contain rounded-3xl transition-transform duration-500 hover:scale-105 fade-in"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x300/101F30/A2B4C0?text=صورة+غير+متوفرة";
            }}
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-[#101F30]">{product.title}</h1>
            <p className="text-[#2B1A0F] leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">{ratingStars}</span>
              <span className="text-[#A2B4C0] text-sm">
                ({product.rating?.count || 0} تقييم)
              </span>
            </div>

            <p className="text-xl font-bold text-[#D8C2A7]">
              السعر: ${product.price?.toFixed(2) || "N/A"}
            </p>

            <p className="text-[#A2B4C0]">الفئة: {product.category}</p>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              onClick={() => router.back()}
              aria-label="رجوع"
              className="w-full md:w-1/2 py-3 flex items-center justify-center gap-2 bg-[#A2B4C0] text-[#101F30] rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-[#D8C2A7] hover:text-[#F3EEE8] transition-all"
            >
              <FaArrowLeft />
              رجوع
            </button>

            <button
              onClick={handleAddToCart}
              aria-label="أضف للسلة"
              className="w-full md:w-1/2 py-3 flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8] transition-all"
            >
              🛒 أضف للسلة
            </button>

            <button
              onClick={handleShare}
              aria-label="مشاركة المنتج"
              className="w-full md:w-1/2 py-3 flex items-center justify-center gap-2 bg-[#F3EEE8] border border-[#A2B4C0] text-[#101F30] rounded-xl font-bold shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8] transition-all"
            >
              <FaShareAlt />
              مشاركة
            </button>
          </div>
        </div>
      </section>
    </main></>
  );
}
