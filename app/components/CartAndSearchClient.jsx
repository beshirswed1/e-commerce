"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

/**
 * CartAndSearchClient
 * 
 * Handles:
 * - Product search filtering
 * - Category filtering
 * - Cart counter & toast notifications
 * 
 * Props:
 * - children: React nodes (e.g., cart icon)
 * - mockProducts: array of product objects
 * - mockCategories: array of category objects
 * - isCategoryDisplay: boolean to toggle category cards
 */

// Global cart state
let globalCartCount = 0;
let updateCartCountCallback = null;

const CartAndSearchClient = ({ children, mockProducts, mockCategories, isCategoryDisplay = false }) => {
    const [cartCount, setCartCount] = useState(globalCartCount);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const containerRef = useRef(null);

    // Filter products
    const filteredProducts = mockProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !activeCategory || product.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    // Set global cart callback
    useEffect(() => {
        updateCartCountCallback = (newCount, message) => {
            setCartCount(newCount);
            globalCartCount = newCount;
            setToastMessage(message);
            setIsToastVisible(true);
            setTimeout(() => setIsToastVisible(false), 3000);
        };
        return () => { updateCartCountCallback = null; };
    }, []);

    // Handle Add to Cart and Show Details buttons
    useEffect(() => {
        const handleClick = (event) => {
            const addBtn = event.target.closest('.add-to-cart-btn');
            const detailsBtn = event.target.closest('.show-details-btn');

            if (addBtn) {
                const productData = JSON.parse(addBtn.dataset.product);
                const newCount = globalCartCount + 1;
                if (updateCartCountCallback) {
                    updateCartCountCallback(newCount, `${productData.name} أُضيف إلى السلة!`);
                }
            }

            if (detailsBtn) {
                const productData = JSON.parse(detailsBtn.dataset.product);
                window.dispatchEvent(new CustomEvent('openModal', {
                    detail: {
                        type: 'product-details',
                        title: `تفاصيل: ${productData.name}`,
                        content: productData,
                    }
                }));
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Handle category click
    const handleCategoryClick = (categorySlug) => {
        setActiveCategory(prev => prev === categorySlug ? null : categorySlug);
        alert(`تم تطبيق فلتر: ${categorySlug}.`);
        window.location.href = '#featured-products';
    };

    // --- Render Category Cards ---
    if (isCategoryDisplay) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {mockCategories.map((cat) => {
                    const Icon = cat.icon || (() => null); // fallback إذا لم يوجد أيقونة
                    const isActive = activeCategory === cat.slug;
                    return (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.slug)}
                            className={`p-6 rounded-2xl text-center cursor-pointer transition duration-300 transform hover:scale-[1.03] hover:shadow-xl ${
                                isActive
                                    ? 'bg-[--color-cream] shadow-lg border-2 border-[--color-dark]'
                                    : 'bg-white shadow-md border border-[--color-muted]'
                            }`}
                            style={{ color: 'var(--color-dark)' }}
                        >
                            <Icon className="w-8 h-8 mx-auto mb-3" />
                            <h4 className="text-lg font-bold">{cat.name}</h4>
                            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{cat.description}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    // --- Render Search & Cart ---
    return (
        <div ref={containerRef} className="flex items-center space-x-6 space-x-reverse relative">
            {/* Search Input */}
            <div className={`relative flex items-center transition-all duration-300 ${isSearchActive ? 'w-full md:w-80' : 'w-10 md:w-64'} md:flex`}>
                <input
                    type="search"
                    placeholder="ابحث عن ساعات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchActive(true)}
                    onBlur={() => setIsSearchActive(searchTerm.length > 0)}
                    className={`bg-[--color-bg] border border-[--color-muted] p-2.5 rounded-full outline-none transition-all duration-300 focus:ring-2 focus:ring-[--color-cream] text-sm ${isSearchActive ? 'w-full pr-10' : 'w-full pr-10 md:pl-4'}`}
                    style={{ color: 'var(--color-dark)' }}
                    aria-label="شريط البحث عن المنتجات"
                />
                <Search
                    className="w-5 h-5 absolute right-3 cursor-pointer"
                    style={{ color: 'var(--color-muted)' }}
                    onClick={() => setIsSearchActive(true)}
                />
            </div>

            {/* Children (Cart Icon, etc.) */}
            <div className="flex items-center space-x-4 space-x-reverse">
                {children}
            </div>

            {/* Toast Notification */}
            {isToastVisible && (
                <div
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[--color-dark] text-white px-6 py-3 rounded-xl shadow-2xl z-[1000] flex items-center"
                    role="status"
                >
                    <ShoppingCart className="w-5 h-5 ml-2" />
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default CartAndSearchClient;
