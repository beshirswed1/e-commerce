"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ShoppingCart, DollarSign, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

/**
 * دالة لتحديد محتوى المودال بناءً على نوعه
 */
const getModalContent = (type, data) => {
    switch (type) {
        case 'product-details':
            const product = data.content;
            if (!product) return <p>لا توجد بيانات للمنتج.</p>;
            return (
                <div className="p-6">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
                        {product.name}
                    </h3>
                    <img src={product.img} alt={product.name} className="w-full h-64 object-cover rounded-xl mb-4" />
                    <p className="text-xl font-semibold mb-2 flex items-center" style={{ color: 'var(--color-brown)' }}>
                        <DollarSign className="w-5 h-5 ml-2" /> السعر: ${product.price}
                    </p>
                    <p className="mb-2 flex items-center" style={{ color: 'var(--color-dark)' }}>
                        <Info className="w-5 h-5 ml-2" /> الفئة: {product.category}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                        تفاصيل إضافية: ساعة فاخرة بتصميم أنيق، مقاومة للماء حتى 50 متر، حركة أوتوماتيكية سويسرية الصنع. مثالية للمناسبات الرسمية.
                    </p>
                    <button
                        className="mt-6 w-full py-3 rounded-xl text-white font-bold transition duration-300 hover:opacity-90 flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-dark)' }}
                        onClick={() => window.alert('تم تشغيل وظيفة الإضافة للسلة!')}
                    >
                        <ShoppingCart className="w-5 h-5 ml-2" /> أضف إلى السلة
                    </button>
                </div>
            );

        case 'footer-عنّا':
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">رؤيتنا</h3>
                    <p>نحن منصة متخصصة لبيع الساعات الفاخرة والكلاسيكية، ملتزمون بتقديم أعلى مستويات الجودة والحرفية السويسرية لعملائنا في الشرق الأوسط.</p>
                </div>
            );

        case 'footer-اتصل-بنا':
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">تواصل معنا</h3>
                    <p>لأي استفسارات، يرجى الاتصال على 966-500-123456 أو إرسال بريد إلكتروني على info@luxurywatches.com.</p>
                </div>
            );

        case 'footer-الوظائف':
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">انضم لفريقنا</h3>
                    <p>نبحث دائماً عن مواهب شغوفة في التسويق والمبيعات وخدمة العملاء. أرسل سيرتك الذاتية إلى careers@luxurywatches.com.</p>
                </div>
            );

        case 'footer-الشحن':
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">سياسات الشحن</h3>
                    <p>نوفر شحن سريع ومجاني للطلبات أكثر من 500 دولار. مدة الشحن المتوقعة 3-5 أيام عمل.</p>
                </div>
            );

        case 'footer-سياسة-الإرجاع':
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">الإرجاع</h3>
                    <p>يمكن إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام بشرط أن يكون في حالته الأصلية ومرفقاً بكافة الأوراق.</p>
                </div>
            );

        case 'footer-الأسئلة-الشائعة':
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">الأسئلة الشائعة</h3>
                    <p>قسم مخصص للأسئلة الشائعة يغطي جميع استفساراتك حول الضمان، الصيانة، والخدمات الإضافية.</p>
                </div>
            );

        default:
            return (
                <div className="p-6 text-right" style={{ color: 'var(--color-dark)' }}>
                    <h3 className="text-2xl font-bold mb-3">معلومات</h3>
                    <p>لا يوجد محتوى لهذا الرابط بعد. يرجى مراجعة محتوى المودال.</p>
                </div>
            );
    }
};

const InteractiveModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({ title: '', type: '', content: null });
    const modalRef = useRef(null);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // إعادة التركيز للعنصر الذي فتح المودال (a11y)
        document.querySelector(':focus')?.focus();
    }, []);

    useEffect(() => {
        const handleOpenModal = (event) => {
            const { type, title, content } = event.detail;
            setModalData({ title: title || 'تفاصيل', type, content });
            setIsOpen(true);
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeModal();
        };

        window.addEventListener('openModal', handleOpenModal);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('openModal', handleOpenModal);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    if (typeof document === 'undefined' || !isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[900] flex items-center justify-center p-4 transition-opacity duration-300"
            style={{ backgroundColor: 'rgba(16, 31, 48, 0.8)' }}
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                className="relative bg-[--color-bg] rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100"
                style={{ color: 'var(--color-dark)', border: '3px solid var(--color-cream)' }}
                onClick={(e) => e.stopPropagation()}
                tabIndex="-1"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 sticky top-0 bg-[--color-bg] border-b border-[--color-muted]/50 z-10">
                    <h2 id="modal-title" className="text-xl font-bold">{modalData.title}</h2>
                    <button
                        onClick={closeModal}
                        className="p-2 rounded-full hover:bg-[--color-cream] transition duration-300"
                        aria-label="إغلاق"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                    {getModalContent(modalData.type, modalData)}
                </div>
            </div>
        </div>,
        document.body
    );
};

// Wrapper للتعامل مع روابط الفوتر أو أزرار المودال
export const FooterModalClient = ({ children }) => {
    const handleClick = (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.modalType) {
            e.preventDefault();
            window.dispatchEvent(
                new CustomEvent('openModal', {
                    detail: { type: button.dataset.modalType, title: button.dataset.title, content: null },
                })
            );
        }
    };

    return <div onClick={handleClick} className="w-full">{children}</div>;
};

export default InteractiveModal;
