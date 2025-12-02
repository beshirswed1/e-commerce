"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaTag, FaBoxOpen } from "react-icons/fa";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white rounded-xl overflow-hidden border border-[#D8C2A7]/30 shadow-lg relative group transition-all duration-300"
    >
      {/* Image Area */}
      <div className="h-48 overflow-hidden bg-white p-4 flex items-center justify-center relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-[#101F30] text-[#F3EEE8] text-xs px-2 py-1 rounded-full font-bold shadow-md">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 bg-[#F3EEE8]/50 h-full">
        <h3 className="text-[#101F30] font-bold text-lg mb-2 line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        <p className="text-[#A2B4C0] text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-extrabold text-[#101F30]">
            ${product.price}
          </span>
          <div className="flex items-center gap-1 text-xs text-[#101F30]/70 font-medium bg-[#D8C2A7]/30 px-2 py-1 rounded-md">
            <FaBoxOpen /> <span>Available</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-[#D8C2A7]/30">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#A2B4C0]/20 text-[#101F30] hover:bg-[#101F30] hover:text-[#F3EEE8] transition-colors font-semibold text-sm"
          >
            <FaEdit /> تعديل
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-semibold text-sm"
          >
            <FaTrash /> حذف
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;