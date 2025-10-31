    "use client";

    import React, { useEffect, useState } from "react";
    import { useParams, useRouter } from "next/navigation";
    import { useAppContext } from '../../../context/AppContext';  //علشان اقدر استخدم السلة 

    export default function ProductsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useAppContext(); //علشان يجيب دالة الاضافة للسلة 
    const { productsDetails } = params; // الـ ID من URL
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

            if (foundProduct) {
            setProduct(foundProduct);
            } else {
            setError(true);
            }
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
        };

        fetchProduct();
    }, [productsDetails]);

    // 🌀 شاشة التحميل
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
            <p className="mt-4 text-xl font-semibold text-[#101F30]">
                جاري تحميل تفاصيل المنتج...
            </p>
            </div>
        </div>
        );

    // ❌ شاشة الخطأ
    if (error || !product)
        return (
        <div className="flex items-center justify-center min-h-screen bg-[#F3EEE8]">
            <div className="p-8 max-w-lg mx-auto bg-[#2B1A0F] rounded-2xl shadow-3xl border border-[#A2B4C0]/50 text-center">
            <h2 className="text-3xl font-extrabold text-[#D8C2A7] mb-4">
                ❌ المنتج غير موجود أو فشل في التحميل
            </h2>
            <p className="text-lg text-[#A2B4C0] mb-6">
                تحقق من الرابط أو اتصالك بالإنترنت وحاول مرة أخرى.
            </p>
            <button
                onClick={() => router.back()} 
                className="px-6 py-3 bg-[#A2B4C0] text-[#101F30] font-bold rounded-xl hover:bg-[#D8C2A7] hover:text-[#F3EEE8] transition-all"
            >
                🔙 العودة
            </button>
            </div>
        </div>
        );

    // ✅ صفحة التفاصيل
    return (
        <div className="min-h-screen bg-[#F3EEE8] flex flex-col items-center justify-center p-6">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#A2B4C0]/30">
            {/* صورة المنتج */}
            <div className="md:w-1/2 bg-[#F3EEE8] p-8 flex items-center justify-center">
            <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain rounded-xl transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                    "https://placehold.co/400x300/101F30/A2B4C0?text=صورة+غير+متوفرة";
                }}
            />
            </div>

            {/* تفاصيل المنتج */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-[#101F30] mb-4">
                {product.title}
                </h1>
                <p className="text-[#2B1A0F] mb-6 leading-relaxed">
                {product.description}
                </p>
                <div className="space-y-2 mb-6">
                <p className="text-xl font-extrabold text-[#D8C2A7]">
                    💲 السعر: ${product.price.toFixed(2)}
                </p>
                <p className="text-lg text-[#A2B4C0]">
                    🏷️ الفئة: {product.category}
                </p>
                <p className="text-lg text-[#A2B4C0]">
                    ⭐ التقييم: {product.rating?.rate || "N/A"} (
                    {product.rating?.count || 0} تقييم)
                </p>
                </div>
            </div>

            {/* الأزرار */}
            <div className="flex flex-col md:flex-row gap-4">
                <button
                onClick={() => router.back()}
                className="w-full md:w-1/2 py-3 flex items-center justify-center gap-2 bg-[#A2B4C0] text-[#101F30] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#D8C2A7] hover:text-[#F3EEE8]"
                >
                🔙 رجوع إلى الفئة
                </button>

                <button
                 onClick={() => addToCart(product.id.toString())} //علشان اول ما يضغط علي الزر تتضاف في السلة 
                 className="w-full md:w-1/2 py-3 flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8]">
                🛒 أضف للسلة
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    }
