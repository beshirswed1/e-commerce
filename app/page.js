// app/page.js
// "use client";

// import { Star, ShoppingCart, User, ChevronRight, MapPin, Phone, Mail, X } from 'lucide-react';
// import { useAppContext } from './context/AppContext';
// import Sidebar from './components/sidebar/sidebar';
// import InteractiveModal, { FooterModalClient } from './components/InteractiveModal';
// import NewsletterClient from './components/NewsletterClient';

// // بيانات وهمية للمنتجات
// const mockProducts = [
//   { id: 'p1', name: 'Chrono Luxe 42', category: 'رجالية', price: 299, rating: 4.7, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
//   { id: 'p2', name: 'Elegant Stellar 36', category: 'نسائية', price: 349, rating: 4.9, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
//   { id: 'p3', name: 'Sport Pro X', category: 'ذكية', price: 199, rating: 4.5, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
//   { id: 'p4', name: 'Heritage Classic', category: 'فاخرة', price: 899, rating: 5.0, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
//   { id: 'p5', name: 'Titan Edge', category: 'رجالية', price: 450, rating: 4.6, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
//   { id: 'p6', name: 'Minimalist Moon', category: 'نسائية', price: 180, rating: 4.4, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600' },
// ];

// const mockReviews = [
//   { id: 1, name: 'عبدالله م.', text: 'جودة لا تُضاهى وخدمة عملاء ممتازة. وصلت الساعة في أقل من 48 ساعة.', rating: 5 },
//   { id: 2, name: 'مريم أ.', text: 'الساعة النسائية كانت هدية رائعة. تصميمها أنيق ومختلف تماماً عن المتوقع.', rating: 4.8 },
//   { id: 3, name: 'سالم ح.', text: 'التحفة الكلاسيكية التي حصلت عليها هي الأجمل في مجموعتي. تقييم 5 نجوم!', rating: 5 },
// ];

// // مكون عرض النجوم
// const RenderStars = ({ count }) => {
//   const fullStars = Math.floor(count);
//   const hasHalfStar = count - fullStars >= 0.5;
//   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//   return (
//     <div className="flex items-center space-x-0.5" dir="ltr">
//       {[...Array(fullStars)].map((_, i) => (
//         <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
//       ))}
//       {hasHalfStar && <Star key="half" className="w-4 h-4 text-[#FFD700] fill-current" />}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} className="w-4 h-4 text-gray-300" />
//       ))}
//     </div>
//   );
// };

// // كرت المنتج الجديد بنفس شكل CategoryPage
// const ProductCard = ({ product, addToCart }) => {
//   return (
//     <div className="bg-[#101F30] rounded-2xl shadow-xl border border-transparent transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.03] hover:border-[#D8C2A7]/50">
//       {/* صورة المنتج */}
//       <div className="group relative bg-[#F3EEE8] flex items-center justify-center h-56 p-4 rounded-t-2xl overflow-hidden">
//         <div className="absolute inset-0 bg-linear-to-t from-transparent to-transparent group-hover:from-black/10 group-hover:to-black/30 transition-opacity duration-500 pointer-events-none z-10"></div>
//         <img
//           src={product.img}
//           alt={product.name}
//           className="max-h-48 object-contain transition-transform duration-500 group-hover:scale-110"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600";
//             e.target.className = "max-h-48 object-cover";
//           }}
//         />
//       </div>

//       {/* تفاصيل المنتج */}
//       <div className="p-5">
//         <h3 className="font-semibold text-lg text-[#A2B4C0] line-clamp-2 mb-2 min-h-12">{product.name}</h3>
//         <p className="text-[#D8C2A7] mb-2">
//           {product.name.length > 80 ? product.name.substring(0, 80) + "..." : product.name}
//         </p>
//         <p className="text-xl text-[#D8C2A7] font-extrabold mb-4">${product.price.toFixed(2)}</p>

//         <div className="flex justify-between items-center mb-4">
//           <RenderStars count={product.rating} />
//         </div>

//         {/* زر التفاصيل */}
//         <button
//           data-modal-type="product-details"
//           data-product={JSON.stringify(product)}
//           className="w-full py-3 flex items-center justify-center gap-2 bg-[#A2B4C0] text-[#F3EEE8] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#D8C2A7] hover:text-[#101F30] mb-2"
//         >
//           عرض التفاصيل
//         </button>

//         {/* زر أضف للسلة */}
//         <button
//           onClick={() => addToCart(product.id)}
//           className="w-full py-3 flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:bg-[#A2B4C0] hover:text-[#F3EEE8]"
//         >
//           <ShoppingCart className="inline w-5 h-5 ml-2" /> أضف إلى السلة
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function Page() {
//   const { addToCart } = useAppContext();

//   return (
//     <div dir="rtl" className="min-h-screen flex bg-[#F3EEE8] font-inter">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="flex-1 ml-0 md:ml-64">
//         {/* Hero Section */}
//         <section id="hero" className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-b-3xl mb-16 shadow-xl">
//           <div
//             className="absolute inset-0 bg-cover bg-center transition duration-1000 ease-in-out transform hover:scale-[1.03] flex items-center justify-center"
//             style={{ backgroundImage: `url(https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600)` }}
//           >
//             <div className="absolute inset-0 bg-[#101F30]/40"></div>
//           </div>
//           <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-center">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-[#F3EEE8]">اكتشف أحدث الساعات الفاخرة</h1>
//             <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-[#F3EEE8]">
//               تحف فنية تزين معصمك. دقة سويسرية، أناقة لا تنتهي، وتاريخ يُصنع الآن.
//             </p>
//             <a
//               href="#featured-products"
//               className="inline-block px-10 py-3 text-lg font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl mx-auto"
//               style={{ backgroundColor: '#D8C2A7', color: '#101F30' }}
//             >
//               تسوق الآن <ChevronRight className="inline w-5 h-5 mr-1" />
//             </a>
//           </div>
//         </section>

//         {/* Featured Products Section */}
//         <section id="featured-products" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
//           <h2 className="text-3xl font-bold mb-10 text-center text-[#101F30]">
//             <span className="border-b-4 border-[#D8C2A7] pb-1">منتجات مختارة بعناية</span>
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {mockProducts.map((product) => (
//               <ProductCard key={product.id} product={product} addToCart={addToCart} />
//             ))}
//           </div>
//         </section>

//         {/* Reviews Section */}
//         <section id="reviews" className="bg-white py-20 mb-20">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold mb-12 text-center text-[#101F30]">ماذا يقول عملاؤنا؟</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {mockReviews.map((review, index) => (
//                 <div
//                   key={review.id}
//                   className={`p-8 rounded-2xl shadow-xl transition duration-500 ${index === 0 ? 'bg-[#D8C2A7]/50 transform scale-[1.02] shadow-2xl border-2 border-[#D8C2A7]' : 'bg-[#F3EEE8] border border-[#A2B4C0]'}`}
//                   style={{ color: '#101F30' }}
//                 >
//                   <RenderStars count={review.rating} />
//                   <p className="mt-4 text-lg italic">"{review.text}"</p>
//                   <p className="mt-4 font-semibold text-sm text-[#2B1A0F]">— {review.name}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Newsletter Section */}
//         <section id="newsletter" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
//           <div className="p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-center" style={{ backgroundColor: '#101F30', color: '#F3EEE8' }}>
//             <div>
//               <h3 className="text-3xl font-bold mb-2">انضم إلى نشرتنا الإخبارية</h3>
//               <p className="text-lg opacity-80">احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك.</p>
//             </div>
//             <div className="mt-6 md:mt-0 w-full md:w-auto">
//               <NewsletterClient />
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="py-12" style={{ backgroundColor: '#2B1A0F', color: '#F3EEE8' }}>
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
//               <FooterModalClient>
//                 <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">شركتنا</h4>
//                 <ul className="space-y-2">
//                   {['عنّا', 'اتصل بنا', 'الوظائف'].map((link) => (
//                     <li key={link}>
//                       <button
//                         data-modal-type={`footer-${link.replace(/\s/g, '-')}`}
//                         data-title={link}
//                         className="text-white/80 hover:text-[#D8C2A7] transition duration-300 text-right"
//                       >
//                         {link}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </FooterModalClient>

//               <FooterModalClient>
//                 <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">المساعدة</h4>
//                 <ul className="space-y-2">
//                   {['الشحن', 'سياسة الإرجاع', 'الأسئلة الشائعة'].map((link) => (
//                     <li key={link}>
//                       <button
//                         data-modal-type={`footer-${link.replace(/\s/g, '-')}`}
//                         data-title={link}
//                         className="text-white/80 hover:text-[#D8C2A7] transition duration-300 text-right"
//                       >
//                         {link}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </FooterModalClient>

//               <div>
//                 <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">تواصل معنا</h4>
//                 <p className="flex items-center text-sm mb-2"><MapPin className="w-5 h-5 ml-2" /> الرياض، المملكة العربية السعودية</p>
//                 <p className="flex items-center text-sm mb-2"><Phone className="w-5 h-5 ml-2" /> 966-500-123456</p>
//                 <p className="flex items-center text-sm"><Mail className="w-5 h-5 ml-2" /> info@luxurywatches.com</p>
//               </div>

//               <div>
//                 <h4 className="text-xl font-semibold mb-4 text-[#D8C2A7]">تابعنا</h4>
//                 <div className="flex space-x-4 space-x-reverse">
//                   <X className="w-6 h-6 hover:text-[#D8C2A7] cursor-pointer transition duration-300" aria-label="تويتر" />
//                   <Star className="w-6 h-6 hover:text-[#D8C2A7] cursor-pointer transition duration-300" aria-label="انستغرام" />
//                   <User className="w-6 h-6 hover:text-[#D8C2A7] cursor-pointer transition duration-300" aria-label="فيسبوك" />
//                 </div>
//               </div>
//             </div>

//             <div className="pt-8 mt-8 border-t border-[#D8C2A7]/30 text-center text-sm">
//               &copy; {new Date().getFullYear()} ساعات الفخامة. جميع الحقوق محفوظة.
//             </div>
//           </div>
//         </footer>

//         <InteractiveModal />
//       </main>
//     </div>
//   );
// }

// app/home/page.js
// ملاحظة سريعة:
// - استبدل مسارات الصور placeholders الموجودة في المصفوفات بالصور الحقيقية لديك (مثلاً: /images/hero1.jpg).
// - لربط البيانات لاحقًا بواجهة API حقيقية، استبدل الـ mock arrays بمناداة fetch داخل useEffect أو استخدم Server Components.
// - يُفترض أن Tailwind مُعد في المشروع. هذا الملف ملف Client-side (التفاعلات: slider, toast).
//
// هل تريد استبدال mock data ببيانات من API؟ ضع التعليق التالي كمثال داخل useEffect:
// fetch('https://fakestoreapi.com/products').then(r=>r.json()).then(data=>setFeaturedProducts(data));
//
// === لا تقم بإضافة أي نص خارج الكود أدناه ===

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/Navbar';
import { FiTruck, FiCreditCard, FiRefreshCcw, FiTool } from "react-icons/fi";
import { 
  FaFacebook, FaInstagram, FaTwitter, 
  FaCcVisa, FaCcMastercard, FaCcPaypal, 
  FaPhoneAlt, FaQuestionCircle, FaStore, FaTruck 
} from "react-icons/fa";

/* ===========================
   CSS Variables (colors)
   =========================== */
const RootStyle = () => (
  <style jsx global>{`
    :root{
      --color-bg: #F3EEE8;
      --color-text: #101F30;
      --color-accent: #D8C2A7;
      --color-accent-2: #A2B4C0;
      --color-strong: #2B1A0F;
    }
    html,body,#__next{height:100%}
    body{background:var(--color-bg); color:var(--color-text);}
    /* Small utility for blur-up placeholder */
    .img-placeholder{filter: blur(8px); transform: scale(1.02);}
  `}</style>
);

/* ===========================
   Mock Data (استبدلها لاحقًا بالـ API)
   =========================== */
const categories = [
  { id: 1, name: 'الكنب', image: 'https://arkanallqasr.com/wp-content/uploads/2021/06/oooklk%D8%A7%D8%A7%D8%A7%D8%A7%D8%A7%D8%A72-2022-09-08T053858.957.jpg' }, // replace images
  { id: 2, name: 'الكراسي', image: 'https://images.pexels.com/photos/12269764/pexels-photo-12269764.jpeg' },
  { id: 3, name: 'غرف النوم', image: 'https://images.pexels.com/photos/34622756/pexels-photo-34622756.jpeg' },
  { id: 4, name: 'غرف الطعام', image: 'https://images.pexels.com/photos/7546715/pexels-photo-7546715.jpeg' },
  { id: 5, name: 'الإضاءة', image: 'https://images.pexels.com/photos/34566099/pexels-photo-34566099.jpeg' },
  { id: 6, name: ' مرايا', image: 'https://arkanallqasr.com/wp-content/uploads/2024/09/%D9%85%D8%B1%D8%A7%D9%8A%D8%A9-%D8%B7%D9%88%D9%8A%D9%84%D8%A9-scaled.webp' },
];

// Featured products mock (images placeholders)
const featuredProductsMock = [
  { id: 11, title: 'كنبة جلدية ثلاثية', price: 1299, rating: 4.5, image: 'https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg' },
  { id: 12, title: 'طاولة قهوة خشبية', price: 249, rating: 4.2, image: 'https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg' },
  { id: 13, title: 'كرسي قراءة مع وسادة', price: 199, rating: 4.6, image: 'https://images.pexels.com/photos/5028852/pexels-photo-5028852.jpeg' },
  { id: 14, title: 'خزانة ملابس مودرن', price: 899, rating: 4.1, image: 'https://images.pexels.com/photos/6508346/pexels-photo-6508346.jpeg' },
  { id: 15, title: 'أريكة زاوية', price: 1499, rating: 4.8, image: 'https://images.pexels.com/photos/29252369/pexels-photo-29252369.jpeg' },
  { id: 16, title: 'طاولة طعام خمسة مقاعد', price: 999, rating: 4.3, image: 'https://images.pexels.com/photos/7851913/pexels-photo-7851913.jpeg' },
  { id: 17, title: 'مصباح أرضي أنيق', price: 129, rating: 4.0, image: 'https://images.pexels.com/photos/13928892/pexels-photo-13928892.jpeg' },
  { id: 18, title: 'مرآة حائط ديكور', price: 79, rating: 4.0, image: 'https://images.pexels.com/photos/1528975/pexels-photo-1528975.jpeg' },
];

const newArrivalsMock = [
  { id: 21, title: 'كومدينا جانبية', price: 149, image: 'https://images.pexels.com/photos/5490384/pexels-photo-5490384.jpeg' },
  { id: 22, title: 'وسادة زخرفية', price: 29, image: 'https://images.pexels.com/photos/6312013/pexels-photo-6312013.jpeg' },
  { id: 23, title: 'سجادة صالة', price: 199, image: 'https://images.pexels.com/photos/13043795/pexels-photo-13043795.jpeg' },
  { id: 24, title: 'لوحة جدارية', price: 59, image: 'https://images.pexels.com/photos/16614530/pexels-photo-16614530.jpeg' },
  { id: 25, title: 'طقم أطباق', price: 79, image: 'https://images.pexels.com/photos/5745655/pexels-photo-5745655.jpeg' },
  { id: 26, title: 'طاولة تلفزيون', price: 399, image: 'https://arkanallqasr.com/wp-content/uploads/2022/05/O1CN01Gxw7Jl1qoHhiOKhSU_2209599355542-0-cib.jpg' },
];

const inspirationLooks = [
  { id: 'L1', title: 'زاوية قراءة هادئة', image: 'https://images.pexels.com/photos/2079452/pexels-photo-2079452.jpeg' },
  { id: 'L2', title: 'غرفة استقبال دافئة', image: 'https://images.pexels.com/photos/28744513/pexels-photo-28744513.jpeg' },
  { id: 'L3', title: 'مطابخ عملية أنيقة', image: 'https://images.pexels.com/photos/27065116/pexels-photo-27065116.jpeg' },
];

const reviewsMock = [
  { id: 1, name: 'ريم', rating: 5, text: 'الكنبة أجمل من الصور، جودة عالية وخدمة ممتازة.' },
  { id: 2, name: 'أحمد', rating: 5, text: 'التوصيل سريع والتركيب كان سلس.' },
  { id: 3, name: 'سارة', rating: 4, text: 'خدمة العملاء متعاونة، أنصح بالموقع.' },
];

const services = [
  { id: 's1', title: 'توصيل سريع', desc: 'خدمة توصيل خلال 3-5 أيام', icon: <FiTruck size={30} /> },
  { id: 's2', title: 'دفع آمن', desc: 'طرق دفع مشفرة ومضمونة', icon: <FiCreditCard size={30} /> },
  { id: 's3', title: 'إرجاع مجاني', desc: 'إرجاع خلال 30 يوم بدون رسوم', icon: <FiRefreshCcw size={30} /> },
  { id: 's4', title: 'تركيب مجاني', desc: 'خدمة تركيب مجانية لبعض المنتجات', icon: <FiTool size={30} /> },
];

/* ===========================
   Helper components
   =========================== */

function StarRating({ value = 5 }) {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <span key={i} className="text-sm" aria-hidden>
      {i < Math.round(value) ? '★' : '☆'}
    </span>
  ));
  return <div className="text-amber-500">{stars}</div>;
}

/* Toast component */
function Toast({ item, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!item) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-6 bottom-6 z-50 flex items-center space-x-3 rounded-lg bg-white/95 border shadow-lg p-3"
    >
      <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100">
        <Image src={item.image || '/images/placeholder.png'} alt={item.title} fill sizes="48px" className="object-cover" />
      </div>
      <div className="text-sm">
        <div className="font-medium text-slate-800">أضيف إلى السلة</div>
        <div className="text-xs text-slate-600">{item.title}</div>
      </div>
    </div>
  );
}

/* ===========================
   Hero Slider
   =========================== */
function Hero({ slides, onPrimaryCTA, onSecondaryCTA }) {
  const [index, setIndex] = useState(0);
  const slidesCount = slides.length;
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slidesCount);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [slidesCount]);

  function goTo(i) {
    clearInterval(timerRef.current);
    setIndex(i);
    timerRef.current = setInterval(() => setIndex((p) => (p + 1) % slidesCount), 5000);
  }

  return (
    <section aria-label="Hero" className="w-full relative overflow-hidden rounded-lg">
      <div className="relative h-[420px] md:h-[520px] rounded-lg">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={i !== index}
          >
            <div className="relative w-full h-full">
              {/* priority on first slide */}
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="(max-width: 640px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
              <div className="absolute left-6 md:left-16 top-1/4 md:top-1/3 text-left max-w-xl">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white drop-shadow" style={{ color: 'var(--color-bg)' }}>
                  {s.title}
                </h1>
                <p className="mt-3 text-sm md:text-base text-white/90 max-w-md">{s.subtitle}</p>
                <div className="mt-6 flex items-center gap-3">
                  <button
    onClick={() => onPrimaryCTA && onPrimaryCTA(s)}
    aria-label="تسوق الآن"
    className="px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    style={{
      background: 'var(--color-strong)',
      color: '#fff',
    }}
  >
    🛒 تسوق الآن
  </button>

  {/* زر استلهم أفكارك */}
  <button
    onClick={() => onSecondaryCTA && onSecondaryCTA(s)}
    aria-label="استلهم أفكارك"
    className="px-5 py-2 rounded-full border-2 font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
    style={{
      borderColor: 'var(--color-accent)',
      color: 'var(--color-accent)',
      background: 'transparent',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'var(--color-accent)';
      e.currentTarget.style.color = '#fff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--color-accent)';
    }}
  >
    💡 استلهم أفكارك
  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`انتقال للشريحة ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-10 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ===========================
   Categories Grid
          
   =========================== */
function CategoriesGrid({ data }) {
  return (
    <section aria-label="Categories" className="mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">تصفح حسب الفئة</h2>
        <p className="text-sm text-slate-600 mb-6">تصفح حسب الطراز: عصري • كلاسيكي • ريفي</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((c) => (
            <article key={c.id} className="group relative rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="relative h-44">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">{c.name}</h3>
                <button
                  aria-label={`تسوق ${c.name}`}
                  className="text-sm px-3 py-1 rounded-md border"
                  style={{ borderColor: 'var(--color-accent)', color: 'white' }}
                >
                  تسوق الآن
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Featured Products
   =========================== */
function ProductCard({ p, onAdd }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <div className="relative h-56">
        <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded text-xs" style={{ background: 'var(--color-accent)', color: 'var(--color-strong)' }}>
            Best Seller
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-medium text-sm md:text-base">{p.title}</h4>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold">{p.price}$</div>
            <div className="text-xs text-slate-500">VAT included</div>
          </div>
          <div className="text-sm">
            <StarRating value={p.rating} />
          </div>
        </div>
        <div className="mt-3">
          <button
            onClick={() => onAdd(p)}
            aria-label={`أضف ${p.title} للسلة`}
            className="w-full py-2 rounded-md text-white font-medium"
            style={{ background: 'var(--color-strong)' }}
          >
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedProducts({ products, onAdd }) {
  return (
    <section aria-label="Featured Products" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">منتجاتنا الأكثر طلبًا</h2>
          <a href="#" className="text-sm underline text-slate-700">
            عرض الكل
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Promo Strip
   =========================== */
function PromoStrip({ message }) {
  return (
    <section aria-label="Promo" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="rounded-lg p-6 flex flex-col md:flex-row items-center justify-between"
          style={{ background: 'linear-gradient(90deg,var(--color-accent),var(--color-accent-2))' }}
        >
          <div>
            <div className="text-lg font-semibold">عرض محدود</div>
            <div className="text-sm md:text-base font-medium mt-1">{message}</div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button className="px-4 py-2 rounded-md" style={{ background: 'var(--color-strong)', color: '#fff' }}>
              تسوق العروض
            </button>
            <div className="text-xs text-slate-800 bg-white/30 px-3 py-1 rounded">ينتهي العرض خلال 2 يوم</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Inspiration Gallery
   =========================== */
function InspirationGallery({ looks }) {
  return (
    <section aria-label="Inspiration" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">لإلهامك</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {looks.map((l) => (
            <article key={l.id} className="relative rounded-lg overflow-hidden group bg-white shadow-sm">
              <div className="relative h-60">
                <Image src={l.image} alt={l.title} fill className="object-cover group-hover:scale-105 transition-transform" loading="lazy" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-medium">{l.title}</h3>
                
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   New Arrivals Carousel (simple)
   =========================== */
function NewArrivalsCarousel({ items, onAdd }) {
  const [start, setStart] = useState(0);
  const perView = 3;
  useEffect(() => {
    const id = setInterval(() => setStart((s) => (s + perView) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length]);

  const view = [...items.slice(start, start + perView), ...items.slice(0, Math.max(0, start + perView - items.length))].slice(0, perView);

  return (
    <section aria-label="New Arrivals" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">الجديد عندنا</h2>
          <a href="#" className="text-sm underline text-slate-700">
            مشاهدة الكل
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {view.map((it) => (
            <div key={it.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-44">
                <Image src={it.image} alt={it.title} fill className="object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <h4 className="font-medium">{it.title}</h4>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-lg font-semibold">{it.price}$</div>
                  <button onClick={() => onAdd(it)} className="px-3 py-1 rounded-md" style={{ background: 'var(--color-strong)', color: '#fff' }}>
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Reviews Carousel
   =========================== */
function ReviewsCarousel({ reviews }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5500);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <section aria-label="Customer Reviews" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">آراء العملاء</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {reviews.map((r, i) => (
              <div key={r.id} className={`flex-1 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-xl">{r.name.charAt(0)}</div>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <StarRating value={r.rating} />
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Why Choose Us (services)
   =========================== */
function WhyChooseUs({ services }) {
  return (
    <section aria-label="Why Choose Us" className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-lg p-5 shadow-sm flex flex-col items-start gap-3">
              <div className="text-3xl">{s.icon}</div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-slate-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Newsletter Signup
   =========================== */
function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    // هنا يمكن إرسال البريد لbackend - حالياً مجرد محاكاة
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setEmail('');
    }, 2000);
  }
  return (
    <section aria-label="Newsletter" className="mt-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">انضم للنشرة واحصل على خصم</h3>
            <p className="text-sm text-slate-600">سجل بريدك لتحصل على كود خصم 10% لأول طلب</p>
          </div>
          <form onSubmit={onSubmit} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              aria-label="بريدك الإلكتروني"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md border"
              placeholder="أدخل بريدك الإلكتروني"
            />
            <button type="submit" className="px-4 py-2 rounded-md" style={{ background: 'var(--color-strong)', color: '#fff' }}>
              احصل على خصمك
            </button>
          </form>
          {done && <div className="text-sm text-green-600">تم التسجيل — تحقق من بريدك</div>}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Footer Previews (quick links)
   =========================== */
export function FooterPreviews({ categories = [] }) {
  const [modal, setModal] = useState(null);

const modalsContent = {
  "عن المتجر": "متجرنا يحرص على تقديم أفضل المنتجات لعملائه بعناية فائقة وجودة عالية. نحن لا نقدم المنتجات لمجرد البيع، بل نركز على تجربة العملاء من البداية وحتى استلام المنتج. كل منتج يتم اختياره بعناية، مع مراعاة أحدث معايير الجودة والسلامة. هدفنا الأساسي هو إرضاء العميل وبناء علاقة طويلة الأمد قائمة على الثقة والشفافية. نؤمن أن تجربة التسوق يجب أن تكون سهلة، ممتعة، وموثوقة، لذلك نسعى دائمًا لتحسين خدماتنا وتقديم الدعم المستمر. فريقنا ملتزم بالإجابة على جميع الاستفسارات، ومتابعة الطلبات خطوة بخطوة لضمان وصول المنتج في الوقت المحدد وبأفضل حالة ممكنة. نحن نؤمن أن التميز في العمل والالتزام بالقيم المهنية هما أساس نجاح أي متجر إلكتروني. نرحب بجميع العملاء ونسعى لتوفير تجربة تسوق مريحة وسلسة تلبي توقعاتهم واحتياجاتهم. في متجرنا، الجودة، الأمان، والموثوقية هي أولويتنا القصوى، ونحرص دائمًا على الابتكار وتقديم منتجات متنوعة تلائم جميع الأذواق.",
  
  "الأسئلة الشائعة": "هنا نقدم إجابات تفصيلية لأكثر الأسئلة شيوعًا بين عملائنا لضمان تجربة تسوق سلسة وواضحة. أول سؤال عادةً يتعلق بكيفية تقديم الطلبات، ونوضح خطوات اختيار المنتجات، إضافتها إلى سلة الشراء، وإتمام عملية الدفع بأمان. السؤال الثاني يتعلق بطرق الدفع المتاحة، حيث نوفر خيارات متعددة تشمل الدفع عبر البطاقات البنكية، الدفع عند الاستلام، والدفع الإلكتروني الآمن. هناك أيضًا استفسارات حول الشحن، ونوضح أوقات التوصيل، المناطق المغطاة، ورسوم الشحن. أما بالنسبة للإرجاع والاستبدال، نشرح سياساتنا بدقة، بما في ذلك مدة السماح بالإرجاع، الشروط، والعمليات المطلوبة لإتمام الإرجاع أو الاستبدال. بالإضافة لذلك، نجيب على أسئلة تتعلق بالضمان، جودة المنتجات، ومتابعة حالة الطلب بعد الشحن. هدف هذه الأسئلة الشائعة هو توفير الوقت والجهد للعميل، وتمكينه من اتخاذ قرارات شراء واضحة ومبنية على معرفة دقيقة بكل تفاصيل الخدمة التي نقدمها. نحن نسعى من خلالها لتقليل أي لبس أو شكوك لدى العميل وتعزيز ثقته بنا.",
  
  "الشحن والإرجاع": "نقدم في متجرنا خدمة شحن سريعة وآمنة لجميع المناطق، مع التأكيد على الحفاظ على سلامة المنتجات أثناء النقل. نوفر خيارات متعددة للشحن، بما يتناسب مع احتياجات العملاء، بما في ذلك الشحن القياسي والسريع. يتم تتبع جميع الطلبات من لحظة التأكيد وحتى وصول المنتج إلى العميل، لضمان وصوله في الوقت المحدد وبدون أي مشاكل. إذا واجه العميل أي خلل أو لم يكن المنتج مطابقًا للوصف، يمكنه إرجاع المنتج خلال مدة 7 أيام من تاريخ الاستلام، مع ضمان استرداد الأموال أو استبدال المنتج. عملية الإرجاع سهلة وسلسة، حيث نقدم تعليمات واضحة حول تعبئة النموذج وإرسال المنتج مرة أخرى. نحن نحرص على أن تكون عملية الشحن والإرجاع مريحة ومرنة، ونعمل على حل أي مشكلات بسرعة وفعالية. هدفنا هو تحقيق رضا العملاء الكامل، وضمان تجربة شراء آمنة وموثوقة، بحيث يشعر العميل بالثقة عند التعامل معنا في كل مرة.",
  
  "اتصل بنا": "فريق الدعم لدينا متواجد دائمًا للرد على جميع استفسارات العملاء ومساعدتهم في أي مشكلة تواجههم أثناء التسوق. يمكنكم الاتصال بنا عبر الهاتف على الرقم: +90 555 123 4567، حيث يجيب ممثلونا على جميع الاستفسارات بأدب واحترافية. كما يمكنكم التواصل معنا عبر البريد الإلكتروني: support@yourstore.com، وسنحرص على الرد خلال وقت قصير لتقديم الحلول المناسبة. بالإضافة لذلك، يمكن للعملاء متابعة أي استفسار أو تقديم شكوى من خلال نموذج الاتصال على الموقع الإلكتروني، مع ضمان متابعة كل حالة بدقة. نحن نؤمن بأهمية التواصل المستمر مع العملاء ونحرص على تقديم دعم شامل ومتكامل لجميع احتياجاتهم. سواء كانت استفسارات عن المنتجات، الشحن، الإرجاع، أو أي خدمات أخرى، فريقنا جاهز دائمًا لتقديم المساعدة والإرشاد.",
  
  "سياسة الخصوصية": "نحن نحترم خصوصية جميع عملائنا ونلتزم بحماية بياناتهم الشخصية بكل جدية. جميع المعلومات التي يتم جمعها خلال عملية التسوق، مثل الاسم، العنوان، البريد الإلكتروني، ومعلومات الدفع، تُخزن بأمان وتستخدم فقط لتحسين تجربة العميل وتقديم الخدمات المطلوبة. لا نقوم بمشاركة أي بيانات شخصية مع أطراف ثالثة دون موافقة صريحة من العميل، وذلك لضمان حماية خصوصيته بالكامل. جميع معاملات الدفع تتم من خلال بوابات آمنة لضمان سرية البيانات المالية. نحن نستخدم أحدث التقنيات لحماية المعلومات من أي اختراق أو سوء استخدام، ونتبع سياسات صارمة لتأمين البيانات. هدفنا هو تقديم بيئة تسوق آمنة وموثوقة، بحيث يمكن للعملاء التسوق براحة واطمئنان. كما نضمن التزام موظفينا وسياساتنا الداخلية بالمعايير القانونية والأخلاقية المتعلقة بالخصوصية وحماية المعلومات.",
  
  "الشروط والأحكام": "باستخدام هذا الموقع وشراء المنتجات من خلاله، فإن العميل يوافق على الالتزام بالشروط والأحكام الموضحة أدناه. تشمل هذه الشروط تنظيم عملية الشراء، الدفع، الشحن، الإرجاع، وضمان المنتجات. أي عملية شراء تعتبر موافقة ضمنية على هذه الشروط. نحن نحتفظ بحق تعديل الشروط في أي وقت مع إعلام العملاء بالتغييرات عبر الموقع الإلكتروني. كما يلتزم العملاء بتقديم معلومات صحيحة ودقيقة أثناء التسجيل وإتمام عمليات الدفع. يُمنع استخدام الموقع لأي أغراض غير قانونية أو مخالفة للأنظمة المعمول بها. نحن نسعى لتقديم تجربة تسوق عادلة وشفافة لجميع العملاء، مع توفير جميع الحقوق والالتزامات للطرفين، سواء من جانب المتجر أو العميل. الالتزام بهذه الشروط يضمن حقوق جميع الأطراف ويعزز الثقة المتبادلة بيننا وبين العملاء."
};


  const colors = {
    bg: "#F3EEE8",        // WHITE LINEN
    textDark: "#101F30",  // MIRAGE
    accent: "#D8C2A7",    // AKAROA
    border: "#A2B4C0",    // CREOLE
    hover: "#2B1A0F",     // N
  };

  return (
    <footer 
      aria-label="Footer previews" 
      className="mt-16 border-t shadow-inner"
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* روابط سريعة */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h4 
              className="font-bold mb-4 text-lg flex items-center gap-3" 
              style={{ color: colors.textDark }}
            >
              <FaStore /> روابط سريعة
            </h4>
            <ul className="text-sm space-y-3" style={{ color: colors.textDark }}>
              {["عن المتجر", "الأسئلة الشائعة", "الشحن والإرجاع", "اتصل بنا"].map(item => (
                <li key={item}>
                  <button
                    onClick={() => setModal(item)}
                    className="transition-all hover:text-[#D8C2A7] font-medium"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* الفئات */}
          
          {/* طرق الدفع */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h4 
              className="font-bold mb-4 text-lg flex items-center gap-3" 
              style={{ color: colors.textDark }}
            >
              <FaTruck /> طرق الدفع
            </h4>
            <div className="flex items-center gap-5 text-2xl" style={{ color: colors.textDark }}>
              <FaCcVisa className="hover:text-[#D8C2A7] transition-all cursor-pointer" />
              <FaCcMastercard className="hover:text-[#D8C2A7] transition-all cursor-pointer" />
              <FaCcPaypal className="hover:text-[#D8C2A7] transition-all cursor-pointer" />
            </div>
          </div>

          {/* سياسات */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
            <h4 
              className="font-bold mb-4 text-lg flex items-center gap-3" 
              style={{ color: colors.textDark }}
            >
              <FaQuestionCircle /> سياسات
            </h4>
            <ul className="text-sm space-y-3" style={{ color: colors.textDark }}>
              {["سياسة الخصوصية", "الشروط والأحكام"].map(item => (
                <li key={item}>
                  <button
                    onClick={() => setModal(item)}
                    className="transition-all hover:text-[#D8C2A7] font-medium"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* سوشيال ميديا */}
        <div className="flex items-center justify-center gap-8 mt-12 text-2xl" style={{ color: colors.textDark }}>
          <FaFacebook className="hover:text-[#D8C2A7] cursor-pointer transition-all" />
          <FaInstagram className="hover:text-[#D8C2A7] cursor-pointer transition-all" />
          <FaTwitter className="hover:text-[#D8C2A7] cursor-pointer transition-all" />
        </div>

        <div className="mt-10 text-sm text-center" style={{ color: colors.textDark }}>
          © {new Date().getFullYear()} متجرك - كل الحقوق محفوظة.
        </div>
      </div>

      {/* مودال */}
      {modal && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-11/12 text-center animate-fadeIn"
            style={{ color: colors.textDark }}
          >
            <h3 className="text-xl font-bold mb-4">{modal}</h3>
            <p className="whitespace-pre-line text-[#101F30]">{modalsContent[modal]}</p>
            <button
              onClick={() => setModal(null)}
              className="mt-6 px-8 py-3 bg-[#D8C2A7] text-[#101F30] font-semibold rounded-full hover:bg-[#A2B4C0] transition-all"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

/* ===========================
   Main Page Component
   =========================== */
export default function Page() {
  // بيانات محلية - يمكن تبديلها لاحقًا بfetch
  const [featuredProducts, setFeaturedProducts] = useState(featuredProductsMock);
  const [newArrivals, setNewArrivals] = useState(newArrivalsMock);
  const [toastItem, setToastItem] = useState(null);

  function handleAddToCart(item) {
    // عرض toast فقط (لا تواصل للسيرفر هنا)
    setToastItem(item);
  }

  return (
    <>
    
    <Sidebar/>
      <RootStyle />
     <div className="md:ml-64 ml-0 transition-all duration-500 ease-in-out">
  <main className="bg-[var(--color-bg)] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* HERO */}
          <Hero
            slides={[
              {
                id: 'h1',
                image: '/images/hero1.jpg', // استبدلها بصورة بانر عالية الجودة - مثال: /images/hero1.jpg
                title: 'أضف لمسة من الفخامة إلى بيتك',
                subtitle: 'مجموعات مُنسَّقة لأجواء دافئة. تسليم سريع وتغليف فاخر.',
              },
              {
                id: 'h2',
                image: '/images/hero2.jpg',
                title: 'تصاميم تلائم كل زاوية',
                subtitle: 'اختيارات مُنسقة بعناية لتجديد المساحات بسهولة.',
              },
              {
                id: 'h3',
                image: '/images/hero3.jpg',
                title: 'مجموعات غرف متكاملة',
                subtitle: 'الآن مع عروض خاصة وتجهيز مجاني.',
              },
            ]}
            onPrimaryCTA={() => {
              // يمكن التوجيه لصفحة المنتجات
              window.location.href = '#featured';
            }}
            onSecondaryCTA={() => {
              window.scrollTo({ top: 700, behavior: 'smooth' });
            }}
          />

          {/* CATEGORIES */}
          <CategoriesGrid data={categories} />

          {/* FEATURED */}
          <div id="featured">
            <FeaturedProducts products={featuredProducts} onAdd={handleAddToCart} />
          </div>

          {/* PROMO */}
          <PromoStrip message="خصومات تصل إلى 40% على غرف المعيشة" />

          {/* INSPIRATION */}
          <InspirationGallery looks={inspirationLooks} />

          {/* NEW ARRIVALS */}
          <NewArrivalsCarousel items={newArrivals} onAdd={handleAddToCart} />

          {/* REVIEWS */}
          <ReviewsCarousel reviews={reviewsMock} />

          {/* WHY CHOOSE US */}
          <WhyChooseUs services={services} />

          {/* NEWSLETTER */}
          <NewsletterSignup />

          {/* FOOTER PREVIEWS */}
          <FooterPreviews />
        </div>

        {/* Toast */}
        <Toast item={toastItem} onClose={() => setToastItem(null)} />
      </main>
      </div>
    </>
  );
}
