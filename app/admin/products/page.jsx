'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaLayerGroup } from 'react-icons/fa';

// Redux Actions
import { 
  fetchProducts, 
  fetchCategories, 
  deleteProduct, 
  addProduct, 
  updateProduct
} from '../../../redux/slices/productSlice';

// Components
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import FilterBar from '../components/FilterBar';

export default function ProductsManagement() {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.product);

  // Local State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Initial Fetch
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filtering & Sorting Logic
  const processedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    // 3. Sort
    result.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return result;
  }, [products, searchTerm, categoryFilter, sortOrder]);

  // Pagination Logic
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const displayedProducts = processedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج نهائياً؟')) {
      await dispatch(deleteProduct(id));
    }
  };

  const handleFormSubmit = async (data) => {
    if (editingProduct) {
      await dispatch(updateProduct({ id: editingProduct.id, data }));
    } else {
      await dispatch(addProduct(data));
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F3EEE8] font-sans text-[#101F30]">
      {/* Header Section */}
      <header className="bg-[#101F30] text-[#F3EEE8] py-12 px-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <FaLayerGroup size={300} />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">إدارة المنتجات</h1>
            <p className="text-[#A2B4C0] text-lg">تحكم كامل في المخزون، الأسعار، والفئات.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenAdd}
            className="mt-6 md:mt-0 bg-[#D8C2A7] text-[#101F30] px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-[0_4px_14px_0_rgba(216,194,167,0.39)] hover:shadow-[0_6px_20px_rgba(216,194,167,0.23)] transition-all"
          >
            <FaPlus /> إضافة منتج جديد
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 -mt-8">
        
        {/* Controls */}
        <FilterBar 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
          categories={categories}
          sortOrder={sortOrder} setSortOrder={setSortOrder}
        />

        {/* Loading & Error States */}
        {loading && products.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#101F30]"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8" role="alert">
            <p className="font-bold">خطأ</p>
            <p>{error}</p>
          </div>
        )}

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onEdit={handleOpenEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {!loading && displayedProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <FaLayerGroup size={60} className="mx-auto mb-4" />
            <p className="text-xl font-bold">لا توجد منتجات تطابق بحثك</p>
          </div>
        )}

        {/* Pagination Controls */}
        {processedProducts.length > itemsPerPage && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 rounded-lg bg-white border border-[#D8C2A7] text-[#101F30] disabled:opacity-50 hover:bg-[#101F30] hover:text-[#F3EEE8] transition-colors"
            >
              السابق
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === page 
                    ? 'bg-[#101F30] text-[#F3EEE8] scale-110 shadow-lg' 
                    : 'bg-white text-[#101F30] border border-[#D8C2A7] hover:bg-[#F3EEE8]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 rounded-lg bg-white border border-[#D8C2A7] text-[#101F30] disabled:opacity-50 hover:bg-[#101F30] hover:text-[#F3EEE8] transition-colors"
            >
              التالي
            </button>
          </div>
        )}
      </main>

      {/* Modal Form */}
      <ProductForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
        categories={categories}
        isLoading={loading}
      />
    </div>
  );
}