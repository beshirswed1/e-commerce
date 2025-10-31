'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, updateCartQuantity } = useAppContext();
  const [products, setProducts] = useState([]);

  // جلب بيانات المنتجات من API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

  // دمج بيانات السلة مع بيانات المنتجات
  const cartProductDetails = Object.keys(cartItems)
    .map(itemId => {
      const product = products.find(p => p.id.toString() === itemId);
      return product ? { ...product, quantity: cartItems[itemId] } : null;
    })
    .filter(item => item !== null);

  return (
    <div className="min-h-screen bg-[#14273E] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#E6CBA8]">السلة</h1>

        {cartProductDetails.length === 0 ? (
          <p className="text-[#B7C7D6] text-lg">
            السلة فارغة.{' '}
            <Link href="/" className="text-[#E6CBA8] underline hover:text-[#B7C7D6]">
              تسوق الآن
            </Link>
          </p>
        ) : (
          <div className="space-y-6">
            {cartProductDetails.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row justify-between items-center bg-white border p-4 rounded-md shadow-md">
                <div className="flex-1">
                  <h2 className="font-semibold text-[#14273E]">{item.title}</h2>
                  <p className="mt-1 text-[#14273E]">السعر: {item.price} جنيه</p>
                </div>

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

                <p className="mt-4 md:mt-0 text-[#14273E] font-medium">
                  المجموع: {(item.price * item.quantity).toFixed(2)} جنيه
                </p>
              </div>
            ))}

            <div className="text-right font-bold text-2xl text-[#E6CBA8] mt-4">
              المجموع الكلي: {cartProductDetails
                .reduce((sum, item) => sum + (item.price * item.quantity), 0)
                .toFixed(2)} جنيه
            </div>

            <button className="mt-4 px-6 py-2 bg-[#B7C7D6] text-[#14273E] rounded-md hover:bg-[#E6CBA8] hover:text-[#14273E] transition-colors font-medium">
              إتمام الشراء
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
