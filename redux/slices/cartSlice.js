'use client';
import { createSlice } from "@reduxjs/toolkit";

// Slice للسلة
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // دائماً فارغ على السيرفر
  },
  reducers: {
    // إضافة للسلة
    addToCart: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) state.items[id] = 1;
      else state.items[id] += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // تحديث كمية منتج
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity === 0) delete state.items[id];
      else state.items[id] = quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // تفريغ السلة بالكامل
    clearCart: (state) => {
      state.items = {};
      localStorage.removeItem("cartItems");
    },

    // جلب البيانات من localStorage بعد mount
    setCartFromStorage: (state, action) => {
      state.items = action.payload || {};
    },
  },
});

// Export Actions
export const { addToCart, updateCartQuantity, clearCart, setCartFromStorage } = cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;
