'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const router = useRouter();

  // بيانات السلة
  const [cartItems, setCartItems] = useState({});

  // المستخدم الحالي
  const [user, setUser] = useState(null);

  // تحميل بيانات المستخدم والسلة من localStorage عند أول تشغيل
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedCart = localStorage.getItem("cartItems");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // حفظ المستخدم لما يتغير
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // حفظ السلة لما تتغير
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // إضافة للسلة
  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
  };

  // تعديل الكمية أو الحذف
  const updateCartQuantity = (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => 0;

  // تسجيل الدخول
  const login = (userData) => {
    setUser(userData);
    router.push("/");
  };

  // تسجيل الخروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem("cartItems"); // نفضي السلة وقت تسجيل الخروج (اختياري)
    router.push("/login");
  };
// تفريغ السلة بالكامل
const clearCart = () => {
  setCartItems({});
  localStorage.removeItem("cartItems");
};

  const value = {
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    user,
    login,
    logout,
    setUser,
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};