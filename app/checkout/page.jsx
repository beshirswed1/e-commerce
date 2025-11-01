'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';
import { CreditCard, Wallet, Banknote, HandCoins } from 'lucide-react'; // أيقونات طرق الدفع

const CheckoutPage = () => {
    const { cartItems } = useAppContext();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        governorate: '',
        postalCode: '',
        payment: 'cash',
        extraData: '',
    });

    //  نجيب بيانات المنتجات من API عشان نعرف الأسعار
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Failed to fetch products:', err));
    }, []);

    //  نربط السلة بالمنتجات 
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
        setFormData(prev => ({ ...prev, payment: method, extraData: '' }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(' الطلب اتبعت:', { formData, cartProductDetails });
        alert('تم تأكيد الطلب بنجاح ');
    };

    return (
        <div className="min-h-screen bg-[#14273E] p-6">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-[#14273E]">إتمام الشراء</h1>

                {cartProductDetails.length === 0 ? (
                    <p className="text-[#14273E] text-lg">
                        السلة فاضية.{' '}
                        <Link href="/" className="text-[#14273E] underline hover:text-[#E6CBA8]">
                            ارجع للتسوق
                        </Link>
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/*  فورم بيانات العميل */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* بيانات أساسية */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#14273E] font-medium mb-1">الاسم الكامل</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#14273E] font-medium mb-1">الإيميل</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#14273E] font-medium mb-1">رقم الموبايل</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#14273E] font-medium mb-1">كود بريدي</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#14273E] font-medium mb-1">العنوان بالتفصيل</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#14273E] font-medium mb-1">المدينة</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#14273E] font-medium mb-1">المحافظة</label>
                                    <input
                                        type="text"
                                        name="governorate"
                                        value={formData.governorate}
                                        onChange={handleChange}
                                        className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            {/*  طرق الدفع  */}
                            <div>
                                <label className="block text-[#14273E] font-semibold text-lg mb-3">طريقة الدفع</label>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { id: 'cash', label: 'الدفع عند الاستلام', icon: <HandCoins size={22} /> },
                                        { id: 'card', label: 'بطاقة بنكية (Visa / MasterCard)', icon: <CreditCard size={22} /> },
                                        { id: 'wallet', label: 'محفظة إلكترونية (Vodafone / Etisalat / Orange)', icon: <Wallet size={22} /> },
                                        { id: 'bank', label: 'تحويل بنكي مباشر', icon: <Banknote size={22} /> },
                                    ].map(option => (
                                        <div
                                            key={option.id}
                                            onClick={() => handlePaymentSelect(option.id)}
                                            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all shadow-sm ${formData.payment === option.id
                                                    ? 'border-[#14273E] bg-[#14273E]/10 ring-2 ring-[#14273E]/30'
                                                    : 'border-[#B7C7D6] hover:border-[#14273E]/40 hover:bg-[#E6CBA8]/10'
                                                }`}
                                        >
                                            {/* الأيقونة */}
                                            <div
                                                className={`p-2 rounded-full ${formData.payment === option.id ? 'bg-[#14273E] text-[#E6CBA8]' : 'bg-[#B7C7D6]/40 text-[#14273E]'
                                                    }`}
                                            >
                                                {option.icon}
                                            </div>

                                            {/* النص */}
                                            <div>
                                                <p className="font-medium text-[#14273E]">{option.label}</p>
                                                {formData.payment === option.id && (
                                                    <p className="text-sm text-[#14273E]/70">تم اختيار طريقة الدفع</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/*  بيانات  حسب نوع الدفع */}
                                <div className="mt-4">
                                    {formData.payment === 'card' && (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                name="extraData"
                                                placeholder="رقم البطاقة البنكية"
                                                value={formData.extraData}
                                                onChange={handleChange}
                                                className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                                required
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="تاريخ الانتهاء (MM/YY)"
                                                    className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="رمز الأمان (CVV)"
                                                    className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {formData.payment === 'wallet' && (
                                        <input
                                            type="text"
                                            name="extraData"
                                            placeholder="رقم المحفظة الإلكترونية"
                                            value={formData.extraData}
                                            onChange={handleChange}
                                            className="w-full border border-[#B7C7D6] p-2 rounded-md"
                                            required
                                        />
                                    )}

                                    {formData.payment === 'bank' && (
                                        <textarea
                                            name="extraData"
                                            placeholder="اسم البنك أو رقم الحساب البنكي"
                                            value={formData.extraData}
                                            onChange={handleChange}
                                            className="w-full border border-[#B7C7D6] p-2 rounded-md h-20"
                                            required
                                        />
                                    )}
                                </div>
                            </div>

                            {/*  زرار تأكيد الطلب */}
                            <button
                                type="submit"
                                className="w-full bg-[#14273E] text-[#E6CBA8] py-2 rounded-md hover:bg-[#E6CBA8] hover:text-[#14273E] transition-colors"
                            >
                                تأكيد الطلب
                            </button>
                        </form>

                        {/*  ملخص الطلب */}
                        <div>
                            <h2 className="text-2xl font-semibold text-[#14273E] mb-4">ملخص الطلب</h2>
                            <div className="space-y-4">
                                {cartProductDetails.map(item => (
                                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                        <p className="text-[#14273E] font-medium">{item.title}</p>
                                        <p className="text-[#14273E]">{(item.price * item.quantity).toFixed(2)} جنيه</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-right text-xl font-bold text-[#14273E] mt-4">
                                المجموع الكلي: {total.toFixed(2)} جنيه
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
