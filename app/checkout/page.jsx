'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, Wallet, Banknote, HandCoins, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage = () => {
    const { cartItems } = useAppContext();
    const [products, setProducts] = useState([]);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        governorate: '',
        postalCode: '',
        payment: '',
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCvv: '',
        walletNumber: '',
    });

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Failed to fetch products:', err));
    }, []);

    const cartProductDetails = Object.keys(cartItems)
        .map(itemId => {
            const product = products.find(p => p.id.toString() === itemId);
            return product ? { ...product, quantity: cartItems[itemId] } : null;
        })
        .filter(item => item !== null);

    const total = cartProductDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentSelect = method => {
        setFormData(prev => ({ ...prev, payment: method }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        alert('تم تأكيد الطلب بنجاح ✅');
    };

    // ✅ التحقق قبل الانتقال
    const nextStep = () => {
        setError('');
        if (step === 1) {
            const requiredFields = ['name', 'phone', 'email', 'address', 'city', 'governorate'];
            const emptyFields = requiredFields.filter(field => !formData[field]);
            if (emptyFields.length > 0) {
                setError('من فضلك املأ جميع البيانات المطلوبة قبل الانتقال 🚫');
                return;
            }
        }

        if (step === 2) {
            if (!formData.payment) {
                setError('من فضلك اختر طريقة الدفع قبل الانتقال 🚫');
                return;
            }
            if (formData.payment === 'card') {
                const requiredCard = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'];
                const emptyCard = requiredCard.filter(field => !formData[field]);
                if (emptyCard.length > 0) {
                    setError('من فضلك املأ جميع بيانات البطاقة قبل المتابعة 🚫');
                    return;
                }
            }
            if (formData.payment === 'wallet' && !formData.walletNumber) {
                setError('من فضلك اكتب رقم المحفظة قبل المتابعة 🚫');
                return;
            }
        }

        setStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setError('');
        setStep(prev => Math.max(prev - 1, 1));
    };

    const steps = ['البيانات', 'الدفع', 'تأكيد الطلب'];

    return (
        <div className="min-h-screen bg-[#14273E] p-6">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-[#14273E] text-center">إتمام الشراء</h1>

                {/* 🔹 Stepper */}
                <div className="flex justify-between items-center mb-10 relative">
                    {steps.map((label, index) => (
                        <div key={index} className="flex-1 text-center relative">
                            <div
                                className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full 
                                ${index + 1 <= step ? 'bg-[#14273E] text-[#E6CBA8]' : 'bg-gray-300 text-[#14273E]'}`}
                            >
                                {index + 1 < step ? <CheckCircle size={20} /> : index + 1}
                            </div>
                            <p className={`mt-2 font-medium ${index + 1 <= step ? 'text-[#14273E]' : 'text-gray-500'}`}>
                                {label}
                            </p>
                            {index < steps.length - 1 && (
                                <div
                                    className={`absolute top-5 left-1/2 w-full h-[3px] -z-10 ${index + 1 < step ? 'bg-[#14273E]' : 'bg-gray-300'
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* المحتوى */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && (
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleChange} className="border p-2 rounded-md border-[#B7C7D6]" />
                                    <input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} className="border p-2 rounded-md border-[#B7C7D6]" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="phone" placeholder="رقم الهاتف" value={formData.phone} onChange={handleChange} className="border p-2 rounded-md border-[#B7C7D6]" />
                                    <input type="text" name="postalCode" placeholder="الرمز البريدي (اختياري)" value={formData.postalCode} onChange={handleChange} className="border p-2 rounded-md border-[#B7C7D6]" />
                                </div>
                                <input type="text" name="address" placeholder="العنوان بالتفصيل" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded-md border-[#B7C7D6]" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="city" placeholder="المدينة" value={formData.city} onChange={handleChange} className="border p-2 rounded-md border-[#B7C7D6]" />
                                    <input type="text" name="governorate" placeholder="المحافظة" value={formData.governorate} onChange={handleChange} className="border p-2 rounded-md border-[#B7C7D6]" />
                                </div>

                                {error && <p className="text-red-600 font-medium mt-3 text-sm">{error}</p>}
                            </form>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-lg font-semibold mb-6 text-[#14273E]">طريقة الدفع</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'cash', label: 'الدفع عند الاستلام', icon: <HandCoins size={24} /> },
                                        { id: 'card', label: 'بطاقة بنكية', icon: <CreditCard size={24} /> },
                                        { id: 'wallet', label: 'محفظة إلكترونية', icon: <Wallet size={24} /> },
                                        { id: 'bank', label: 'تحويل بنكي', icon: <Banknote size={24} /> },
                                    ].map(option => (
                                        <motion.div
                                            key={option.id}
                                            onClick={() => handlePaymentSelect(option.id)}
                                            whileHover={{ scale: 1.02 }}
                                            className={`p-5 rounded-xl border cursor-pointer flex items-center gap-3 ${formData.payment === option.id
                                                    ? 'border-[#14273E] bg-[#E6CBA8]/10'
                                                    : 'border-[#B7C7D6] hover:border-[#14273E]/50'
                                                }`}
                                        >
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {formData.payment === 'card' && (
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <input name="cardNumber" placeholder="رقم البطاقة" value={formData.cardNumber} onChange={handleChange} className="border p-2 rounded-md" />
                                        <input name="cardName" placeholder="اسم صاحب البطاقة" value={formData.cardName} onChange={handleChange} className="border p-2 rounded-md" />
                                        <input name="cardExpiry" placeholder="MM / YY" value={formData.cardExpiry} onChange={handleChange} className="border p-2 rounded-md" />
                                        <input name="cardCvv" placeholder="CVV" value={formData.cardCvv} onChange={handleChange} className="border p-2 rounded-md" />
                                    </div>
                                )}

                                {formData.payment === 'wallet' && (
                                    <div className="mt-6">
                                        <input
                                            name="walletNumber"
                                            placeholder="رقم المحفظة أو الهاتف"
                                            value={formData.walletNumber}
                                            onChange={handleChange}
                                            className="border p-2 rounded-md w-full"
                                        />
                                    </div>
                                )}

                                {error && <p className="text-red-600 font-medium mt-3 text-sm">{error}</p>}
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2 className="text-xl font-semibold text-[#14273E] mb-4">مراجعة وتأكيد الطلب</h2>
                                <div className="space-y-3">
                                    {cartProductDetails.map(item => (
                                        <div key={item.id} className="flex justify-between border-b pb-2">
                                            <p>{item.title}</p>
                                            <p>{(item.price * item.quantity).toFixed(2)} جنيه</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-right text-lg mt-4 font-bold text-[#14273E]">
                                    المجموع الكلي: {total.toFixed(2)} جنيه
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* الأزرار */}
                <div className="flex justify-between mt-10">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                    >
                        السابق
                    </button>
                    {step < 3 ? (
                        <button
                            onClick={nextStep}
                            className="px-6 py-2 rounded-md bg-[#14273E] text-[#E6CBA8] hover:bg-[#E6CBA8] hover:text-[#14273E]"
                        >
                            التالي
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                            تأكيد الطلب
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
