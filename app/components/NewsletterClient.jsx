"use client";

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

/* 
  NewsletterClient - Client Component للتعامل مع الاشتراك في النشرة الإخبارية.
  يدعم الحالات: idle، loading، success، error 
*/
const NewsletterClient = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();

        // التحقق البسيط من البريد الإلكتروني
        if (!email || !email.includes('@')) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('loading');

        try {
            // مثال: استبدل الجزء هذا بالـ API الحقيقي عندك
            /* const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            } */

            // محاكاة استجابة ناجحة
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus('success');
            setEmail('');

        } catch (error) {
            console.error("Newsletter submission failed:", error);
            setStatus('error');
        } finally {
            // إعادة الحالة إلى idle بعد نجاح الاشتراك
            if (status !== 'error') {
                setTimeout(() => setStatus('idle'), 4000);
            }
        }
    };

    const isSuccess = status === 'success';
    const isError = status === 'error';
    const isLoading = status === 'loading';

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto relative"
        >
            {/* حقل البريد الإلكتروني */}
            <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle'); // إعادة الحالة عند الكتابة
                }}
                disabled={isLoading || isSuccess}
                className="flex-1 p-3 rounded-xl border-2 outline-none transition duration-300"
                style={{
                    borderColor: isError ? 'red' : 'transparent',
                    color: 'var(--color-dark)',
                    backgroundColor: isSuccess ? 'var(--color-cream)' : 'var(--color-bg)'
                }}
                aria-label="حقل إدخال البريد الإلكتروني"
            />

            {/* زر الاشتراك */}
            <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="py-3 px-6 rounded-xl font-bold transition duration-300 transform hover:scale-[1.03] active:scale-95 flex items-center justify-center text-sm sm:text-base min-w-[120px]"
                style={{
                    backgroundColor: isSuccess ? 'var(--color-cream)' : 'var(--color-brown)',
                    color: isSuccess ? 'var(--color-dark)' : 'var(--color-bg)'
                }}
                aria-live="polite"
            >
                {isLoading ? (
                    'جاري الإرسال...'
                ) : isSuccess ? (
                    <>
                        <Check className="w-5 h-5 ml-2" /> تم الاشتراك
                    </>
                ) : isError ? (
                    'خطأ! حاول مجدداً'
                ) : (
                    <>
                        <Mail className="w-5 h-5 ml-2" /> اشترك الآن
                    </>
                )}
            </button>

            {/* رسالة الخطأ */}
            {isError && (
                <p 
                    className="absolute -bottom-6 text-red-400 text-xs w-full text-center sm:text-right" 
                    role="alert"
                >
                    يرجى إدخال بريد إلكتروني صالح.
                </p>
            )}
        </form>
    );
};

export default NewsletterClient;
