'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const API_BASE = 'https://localhost:7118/api';

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    price: '',
    quantity: '',
    categoryID: '',
    isPublished: true
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Categories?languageCode=ar&isActive=true`);
      setCategories(res.data.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/Product?languageCode=ar`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await axios.put(`${API_BASE}/Product/${editingProductId}`, formData);
        alert('تم تعديل المنتج بنجاح!');
      } else {
        await axios.post(`${API_BASE}/Product`, formData);
        alert('تم إضافة المنتج بنجاح!');
      }
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        price: '',
        quantity: '',
        categoryID: '',
        isPublished: true
      });
      setEditingProductId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء العملية');
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      await axios.delete(`${API_BASE}/Product/${productId}`);
      alert('تم حذف المنتج!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.productID);
    setFormData({
      title: product.title,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      quantity: product.quantity,
      categoryID: product.categoryID,
      isPublished: product.isPublished
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#F3EEE8', minHeight: '100vh', padding: '2rem' }}>
      {/* Form Section */}
      {showForm && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: '#101F30',
            color: '#F3EEE8',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            {editingProductId ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
            <input type="text" name="title" placeholder="اسم المنتج" value={formData.title} onChange={handleChange} required style={inputStyle} />
            <textarea name="description" placeholder="وصف المنتج" value={formData.description} onChange={handleChange} required style={inputStyle} />
            <input type="number" name="price" placeholder="السعر" value={formData.price} onChange={handleChange} required style={inputStyle} />
            <input type="number" name="quantity" placeholder="الكمية" value={formData.quantity} onChange={handleChange} required style={inputStyle} />
            <select name="categoryID" value={formData.categoryID} onChange={handleChange} required style={inputStyle}>
              <option value="">اختر الفئة</option>
              {categories.map(cat => <option key={cat.categoryID} value={cat.categoryID}>{cat.title}</option>)}
            </select>
            <button type="submit" style={buttonStyle}>{editingProductId ? 'تعديل المنتج' : 'إضافة منتج'} <FaPlus /></button>
          </form>
        </motion.div>
      )}

      {/* Toggle Form Button */}
      <button onClick={() => setShowForm(prev => !prev)} style={{ marginBottom: '2rem', ...toggleButtonStyle }}>
        {showForm ? 'إخفاء النموذج' : 'إضافة منتج جديد'} <FaPlus />
      </button>

      {/* Products Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {loading ? (
          <p>جاري التحميل...</p>
        ) : (
          <div style={gridStyle}>
            {products.map(product => (
              <motion.div key={product.productID} whileHover={{ scale: 1.05 }} style={cardStyle}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{product.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{product.shortDescription}</p>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{product.price} {product.currency}</p>
                <p style={{ fontSize: '0.85rem', color: '#A2B4C0', marginBottom: '0.5rem' }}>الكمية: {product.quantity}</p>
                <p style={{ fontSize: '0.85rem', color: '#A2B4C0', marginBottom: '0.5rem' }}>الفئة: {categories.find(c => c.categoryID === product.categoryID)?.title || 'غير محدد'}</p>
                <p style={{ fontSize: '0.85rem', color: product.isPublished ? '#00FF7F' : '#FF6347', marginBottom: '0.5rem' }}>
                  الحالة: {product.isPublished ? 'نشط' : 'غير نشط'}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(product)} style={editButtonStyle}><FaEdit /></button>
                  <button onClick={() => handleDelete(product.productID)} style={deleteButtonStyle}><FaTrash /></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Styles
const inputStyle = {
  padding: '0.7rem',
  borderRadius: '8px',
  border: '1px solid #D8C2A7',
  fontSize: '1rem'
};

const buttonStyle = {
  backgroundColor: '#A2B4C0',
  color: '#101F30',
  padding: '0.7rem',
  borderRadius: '8px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  justifyContent: 'center'
};

const toggleButtonStyle = {
  backgroundColor: '#101F30',
  color: '#F3EEE8',
  padding: '0.7rem 1rem',
  borderRadius: '8px',
  fontWeight: 'bold',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem'
};

const cardStyle = {
  backgroundColor: '#D8C2A7',
  color: '#101F30',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const editButtonStyle = {
  backgroundColor: '#A2B4C0',
  color: '#101F30',
  borderRadius: '6px',
  padding: '0.5rem',
  flex: 1
};

const deleteButtonStyle = {
  backgroundColor: '#FF4C4C',
  color: '#F3EEE8',
  borderRadius: '6px',
  padding: '0.5rem',
  flex: 1
};
