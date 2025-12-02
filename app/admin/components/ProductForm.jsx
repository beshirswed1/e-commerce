"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCloudUploadAlt, FaSave } from "react-icons/fa";

const ProductForm = ({ isOpen, onClose, onSubmit, initialData, categories, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "https://i.pravatar.cc", // Default placeholder
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: "", price: "", description: "", category: "", image: "https://i.pravatar.cc" });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#101F30]/60 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-0"
          >
            {/* Header */}
            <div className="bg-[#101F30] p-6 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-[#F3EEE8]">
                {initialData ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h2>
              <button onClick={onClose} className="text-[#A2B4C0] hover:text-white transition-colors">
                <FaTimes size={24} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-8 grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[#101F30] font-bold mb-2">اسم المنتج</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-[#D8C2A7] rounded-lg focus:ring-2 focus:ring-[#101F30] outline-none transition-all"
                    placeholder="مثال: حقيبة جلدية فاخرة"
                  />
                </div>

                <div>
                  <label className="block text-[#101F30] font-bold mb-2">السعر ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-[#D8C2A7] rounded-lg focus:ring-2 focus:ring-[#101F30] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#101F30] font-bold mb-2">الفئة</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-[#D8C2A7] rounded-lg focus:ring-2 focus:ring-[#101F30] outline-none bg-white"
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[#101F30] font-bold mb-2">وصف المنتج</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full p-3 border border-[#D8C2A7] rounded-lg focus:ring-2 focus:ring-[#101F30] outline-none resize-none"
                  ></textarea>
                </div>

                 {/* Fake Image Upload */}
                 <div className="col-span-1 md:col-span-2 border-2 border-dashed border-[#A2B4C0] rounded-xl p-6 text-center bg-[#F3EEE8]/30 hover:bg-[#F3EEE8] transition-colors cursor-pointer group">
                    <FaCloudUploadAlt className="mx-auto text-4xl text-[#A2B4C0] group-hover:text-[#101F30] transition-colors mb-2" />
                    <p className="text-[#101F30] font-medium">اسحب الصورة هنا أو اضغط للرفع</p>
                    <p className="text-xs text-[#A2B4C0]">JPG, PNG حتى 5MB</p>
                 </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-[#D8C2A7]/30">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg text-[#101F30] font-bold hover:bg-gray-100 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 rounded-lg bg-[#101F30] text-[#F3EEE8] font-bold hover:bg-[#101F30]/90 transition-all flex items-center gap-2 shadow-lg disabled:opacity-70"
                >
                  {isLoading ? 'جاري الحفظ...' : <><FaSave /> حفظ البيانات</>}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductForm;