"use client";
import React, { useState, useEffect } from "react";
import Filter from "@/components/sidebar/filter";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import { ShoppingCart, Info, Star } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen bg-[#E0E1DD] text-[#0D1B2A]">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-t-[#D8C2A7] border-[#A2B4C0] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-semibold">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E0E1DD] text-center text-[#0D1B2A]">
        <div className="bg-[#D8C2A7] p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-[#1B263B] mb-3">
            ❌ خطأ في التحميل ❌
          </h2>
          <p>تحقق من اتصالك بالإنترنت ثم أعد المحاولة.</p>
        </div>
      </div>
    );

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice = item.price <= priceRange;
    const matchesRating = item.rating?.rate >= minRating;
    return matchesSearch && matchesPrice && matchesRating;
  });

  const ProductCard = ({ product }) => (
    <div className="relative mt-14 bg-[#1B263B] rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 border border-[#415A77]/30 group cursor-pointer">
      {/* صورة المنتج */}
      <div className="relative h-64 flex items-center justify-center bg-[#E0E1DD] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-52 w-auto transform transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x300/101F30/A2B4C0?text=Image+Not+Available";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-3 left-3 bg-[#D8C2A7]/80 text-[#0D1B2A] px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-5 text-[#E0E1DD] flex flex-col justify-between min-h-[250px]">
        <div>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-[#D8C2A7]">
            {product.title}
          </h3>
          <p className="text-sm text-[#A2B4C0] line-clamp-3 mb-4">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-[#FFD700]">
            <Star size={18} />
            <span className="text-sm">{product.rating?.rate ?? 4.0}</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/category/${encodeURIComponent(product.category)}/${product.id}`}
              className="flex items-center gap-1 px-8 py-3 bg-[#415A77] text-[#E0E1DD] rounded-full hover:bg-[#D8C2A7] hover:text-[#0D1B2A] transition-colors duration-300"
            >
              <Info size={16} />
              تفاصيل
            </Link>
            <button
              onClick={() => addToCart(product.id.toString())}
              className="flex items-center gap-1 px-2 py-3 bg-[#D8C2A7] text-[#0D1B2A] rounded-full hover:bg-[#415A77] hover:text-[#D8C2A7] transition-all duration-300"
            >
              <ShoppingCart size={16} />
              اضف الى  السلة 
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E0E1DD] text-[#0D1B2A] px-4 md:px-8 lg:px-12 py-10 overflow-x-hidden ">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full sticky top-8 self-start flex fixed">
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
        <div className="md:w-3/3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center text-[#D8C2A7] col-span-full mt-10 text-lg font-semibold">
              لا توجد منتجات مطابقة للمعايير المحددة.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
