'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { cartItems, updateCartQuantity } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  }, []);

  const cartProductDetails = Object.keys(cartItems)
    .map(itemId => {
      const product = products.find(p => p.id.toString() === itemId);
      return product ? { ...product, quantity: cartItems[itemId] } : null;
    })
    .filter(item => item !== null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#14273E] flex justify-center items-center">
        <p className="text-[#E6CBA8] text-xl animate-pulse">جارٍ التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14273E] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#E6CBA8]"> السلة</h1>

        {cartProductDetails.length === 0 ? (
          <p className="text-[#B7C7D6] text-lg">
            السلة فارغة.{' '}
            <Link href="/" className="text-[#E6CBA8] underline hover:text-[#B7C7D6]">
              تسوق الآن
            </Link>
          </p>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {cartProductDetails.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row justify-between items-center bg-[#E6CBA8]/20 border border-[#B7C7D6] p-4 rounded-xl shadow-lg hover:scale-105 transform transition-all"
                >
                  {/* صورة المنتج */}
                  <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* عنوان وسعر المنتج */}
                  <div className="flex-1 md:ml-4">
                    <h2 className="font-semibold text-[#14273E] text-lg">{item.title}</h2>
                    <p className="mt-1 text-[#14273E]">السعر: {item.price} جنيه</p>
                  </div>

                  {/* التحكم في الكمية والحذف */}
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => updateCartQuantity(item.id.toString(), item.quantity - 1)}
                      className="px-3 py-1 bg-[#14273E] text-[#E6CBA8] rounded-md hover:bg-[#E6CBA8] hover:text-[#14273E] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id.toString(), item.quantity + 1)}
                      className="px-3 py-1 bg-[#14273E] text-[#E6CBA8] rounded-md hover:bg-[#E6CBA8] hover:text-[#14273E] transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => updateCartQuantity(item.id.toString(), 0)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      حذف
                    </button>
                  </div>

                  {/* مجموع المنتج */}
                  <p className="mt-4 md:mt-0 text-[#14273E] font-semibold">
                    المجموع: {(item.price * item.quantity).toFixed(2)} جنيه
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* المجموع الكلي */}
            <div className="text-right font-bold text-2xl text-[#E6CBA8] mt-4">
              المجموع الكلي: {cartProductDetails.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} جنيه
            </div>

            <Link href="/checkout">
              <button className="mt-4 px-6 py-2 bg-[#B7C7D6] text-[#14273E] rounded-xl hover:bg-[#E6CBA8] hover:text-[#14273E] transition-all font-medium">
                إتمام الشراء
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;