// app/page.js
"use client";

import { Star, ShoppingCart, User, ChevronRight, MapPin, Phone, Mail, X } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import Sidebar from './components/sidebar/sidebar';
import InteractiveModal, { FooterModalClient } from './components/InteractiveModal';
import NewsletterClient from './components/NewsletterClient';

// بيانات وهمية للمنتجات
const mockProducts = [
  { id: 'p1', name: 'Chrono Luxe 42', category: 'رجالية', price: 299, rating: 4.7, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: 'p2', name: 'Elegant Stellar 36', category: 'نسائية', price: 349, rating: 4.9, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: 'p3', name: 'Sport Pro X', category: 'ذكية', price: 199, rating: 4.5, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: 'p4', name: 'Heritage Classic', category: 'فاخرة', price: 899, rating: 5.0, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: 'p5', name: 'Titan Edge', category: 'رجالية', price: 450, rating: 4.6, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
  { id: 'p6', name: 'Minimalist Moon', category: 'نسائية', price: 180, rating: 4.4, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
];

const mockReviews = [
  { id: 1, name: 'عبدالله م.', text: 'جودة لا تُضاهى وخدمة عملاء ممتازة. وصلت الساعة في أقل من 48 ساعة.', rating: 5 },
  { id: 2, name: 'مريم أ.', text: 'الساعة النسائية كانت هدية رائعة. تصميمها أنيق ومختلف تماماً عن المتوقع.', rating: 4.8 },
  { id: 3, name: 'سالم ح.', text: 'التحفة الكلاسيكية التي حصلت عليها هي الأجمل في مجموعتي. تقييم 5 نجوم!', rating: 5 },
];

// مكون عرض النجوم
const RenderStars = ({ count }) => {
  const fullStars = Math.floor(count);
  const hasHalfStar = count - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5" dir="ltr">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
      ))}
      {hasHalfStar && <Star key="half" className="w-4 h-4 text-[#FFD700] fill-current" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

// كرت المنتج الجديد بنفس شكل CategoryPage
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-[#101F30] rounded-2xl shadow-xl border border-transparent transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.03] hover:border-[#D8C2A7]/50">
      {/* صورة المنتج */}
      <div className="group relative bg-[#F3EEE8] flex items-center justify-center h-56 p-4 rounded-t-2xl overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-transparent to-transparent group-hover:from-black/10 group-hover:to-black/30 transition-opacity duration-500 pointer-events-none z-10"></div>
        <img
          src={product.img}
          alt={product.name}
          className="max-h-48 object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600";
            e.target.className = "max-h-48 object-cover";
          }}
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-[#A2B4C0] line-clamp-2 mb-2 min-h-12">{product.name}</h3>
        <p className="text-[#D8C2A7] mb-2">
          {product.name.length > 80 ? product.name.substring(0, 80) + "..." : product.name}
        </p>
        <p className="text-xl text-[#D8C2A7] font-extrabold mb-4">${product.price.toFixed(2)}</p>

        <div className="flex justify-between items-center mb-4">
          <RenderStars count={product.rating} />
        </div>

        {/* زر التفاصيل */}
        <button
          data-modal-type="product-details"
          data-product={JSON.stringify(product)}
          className="w-full py-3 flex items-center justify-center gap-2 bg-[#A2B4C0] text-[#F3EEE8] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#D8C2A7] hover:text-[#101F30] mb-2"
        >
          عرض التفاصيل
        </button>

        {/* زر أضف للسلة */}
        <button
          onClick={() => addToCart(product.id)}
          className="w-full py-3 flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8]"
        >
          <ShoppingCart className="inline w-5 h-5 ml-2" /> أضف إلى السلة
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  const { addToCart } = useAppContext();

  return (
    <div dir="rtl" className="min-h-screen flex bg-[#F3EEE8] font-inter">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64">
        {/* Hero Section */}
        <section id="hero" className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-b-3xl mb-16 shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-1000 ease-in-out transform hover:scale-[1.03] flex items-center justify-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600)` }}
          >
            <div className="absolute inset-0 bg-[#101F30]/40"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-[#F3EEE8]">اكتشف أحدث الساعات الفاخرة</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-[#F3EEE8]">
              تحف فنية تزين معصمك. دقة سويسرية، أناقة لا تنتهي، وتاريخ يُصنع الآن.
            </p>
            <a
              href="#featured-products"
              className="inline-block px-10 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl mx-auto"
              style={{ backgroundColor: '#D8C2A7', color: '#101F30' }}
            >
              تسوق الآن <ChevronRight className="inline w-5 h-5 mr-1" />
            </a>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured-products" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#101F30]">
            <span className="border-b-4 border-[#D8C2A7] pb-1">منتجات مختارة بعناية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="bg-white py-20 mb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#101F30]">ماذا يقول عملاؤنا؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mockReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`p-8 rounded-2xl shadow-xl transition duration-500 ${index === 0 ? 'bg-[#D8C2A7]/50 transform scale-[1.02] shadow-2xl border-2 border-[#D8C2A7]' : 'bg-[#F3EEE8] border border-[#A2B4C0]'}`}
                  style={{ color: '#101F30' }}
                >
                  <RenderStars count={review.rating} />
                  <p className="mt-4 text-lg italic">"{review.text}"</p>
                  <p className="mt-4 font-semibold text-sm text-[#2B1A0F]">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-center" style={{ backgroundColor: '#101F30', color: '#F3EEE8' }}>
            <div>
              <h3 className="text-3xl font-bold mb-2">انضم إلى نشرتنا الإخبارية</h3>
              <p className="text-lg opacity-80">احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك.</p>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-auto">
              <NewsletterClient />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12" style={{ backgroundColor: '#2B1A0F', color: '#F3EEE8' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <FooterModalClient>
                <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">شركتنا</h4>
                <ul className="space-y-2">
                  {['عنّا', 'اتصل بنا', 'الوظائف'].map((link) => (
                    <li key={link}>
                      <button
                        data-modal-type={`footer-${link.replace(/\s/g, '-')}`}
                        data-title={link}
                        className="text-white/80 hover:text-[#D8C2A7] transition duration-300 text-right"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </FooterModalClient>

              <FooterModalClient>
                <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">المساعدة</h4>
                <ul className="space-y-2">
                  {['الشحن', 'سياسة الإرجاع', 'الأسئلة الشائعة'].map((link) => (
                    <li key={link}>
                      <button
                        data-modal-type={`footer-${link.replace(/\s/g, '-')}`}
                        data-title={link}
                        className="text-white/80 hover:text-[#D8C2A7] transition duration-300 text-right"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </FooterModalClient>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">تواصل معنا</h4>
                <p className="flex items-center text-sm mb-2"><MapPin className="w-5 h-5 ml-2" /> الرياض، المملكة العربية السعودية</p>
                <p className="flex items-center text-sm mb-2"><Phone className="w-5 h-5 ml-2" /> 966-500-123456</p>
                <p className="flex items-center text-sm"><Mail className="w-5 h-5 ml-2" /> info@luxurywatches.com</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">تابعنا</h4>
                <div className="flex space-x-4 space-x-reverse">
                  <X className="w-6 h-6 hover:text-[#D8C2A7] cursor-pointer transition duration-300" aria-label="تويتر" />
                  <Star className="w-6 h-6 hover:text-[#D8C2A7] cursor-pointer transition duration-300" aria-label="انستغرام" />
                  <User className="w-6 h-6 hover:text-[#D8C2A7] cursor-pointer transition duration-300" aria-label="فيسبوك" />
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#D8C2A7]/30 text-center text-sm">
              &copy; {new Date().getFullYear()} ساعات الفخامة. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>

        <InteractiveModal />
      </main>
    </div>
  );
}
