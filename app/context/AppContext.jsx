'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const router = useRouter();

  //  بيانات السلة
  const [cartItems, setCartItems] = useState({});

  //  المستخدم الحالي
  const [user, setUser] = useState(null);

  //  تحميل بيانات المستخدم من localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  //  حفظ المستخدم لما يتغير
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  //  إضافة للسلة
  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
  };

  //  تعديل الكمية أو الحذف
  const updateCartQuantity = (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => 0;

  //  تسجيل الدخول
  const login = (userData) => {
    setUser(userData);
    router.push("/");
  };

  //  تسجيل الخروج
  const logout = () => {
    setUser(null);
    router.push("/login");
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
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
 );
};