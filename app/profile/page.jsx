'use client';
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, cartItems, logout } = useAppContext(); 
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const productsMap = {};
        data.forEach((p) => {
          productsMap[p.id] = { name: p.title, price: p.price, image: p.image };
        });
        setProductsData(productsMap);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#14273E] flex justify-center items-center">
        <div className="text-center text-[#fff] space-y-4">
          <h1 className="text-3xl font-bold tex"> You are not logged in</h1>
          <p>Please login first to view your profile and cart.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#14273E] flex justify-center items-center text-[#E6CBA8]">
        <p className="text-xl animate-pulse">Loading ...</p>
      </div>
    );
  }

  const cartList = Object.entries(cartItems);
  const totalAmount = cartList.reduce((total, [id, qty]) => {
    const product = productsData[id];
    return total + (product?.price || 0) * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-[#14273E] pt-24 px-4 flex flex-col items-center gap-6">

      {/* الكارد */}
      <div className="w-full max-w-3xl bg-[#B7C7D6] rounded-2xl shadow-2xl p-8 space-y-8 flex flex-col">
        <h1 className="text-4xl font-bold text-center text-[#14273E] mb-8">
          Profile
        </h1>

        <div className="space-y-3 text-[#14273E] border-b border-[#B7C7D6] pb-5">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <h2 className="text-2xl font-semibold text-[#14273E] mb-4"> Cart Items</h2>
        {cartList.length > 0 ? (
          <div className="bg-white p-4 rounded-xl shadow-inner space-y-3 max-h-64 overflow-y-auto">
            {cartList.map(([id, quantity]) => {
              const product = productsData[id];
              if (!product) return null;
              return (
                <div key={id} className="flex justify-between items-center bg-[#B7C7D6]/70 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-contain rounded-md" />
                    <p className="font-medium text-[#14273E]">{product.name}</p>
                  </div>
                  <p className="text-[#14273E] font-semibold">
                    {quantity} × ${product.price.toFixed(2)} = ${(quantity * product.price).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[#14273E]/80">Your cart is empty.</p>
        )}

        {cartList.length > 0 && (
          <div className="text-right text-xl font-bold text-[#14273E]">
            Total: ${totalAmount.toFixed(2)}
          </div>
        )}
      </div>

      {/* زر الخروج تحت الكارد على يسار الكارد */}
      <div className="w-full max-w-3xl flex justify-start">
        <button
          onClick={() => logout()}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
