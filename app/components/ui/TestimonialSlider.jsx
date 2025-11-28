import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSlider = () => {
  // بيانات المراجعات الكاملة (20 عنصر)
  const reviewsMock = [
    { id: 1, quote: "الكنبة أجمل من الصور، جودة عالية وخدمة ممتازة.", name: "ريم", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/31749851/pexels-photo-31749851.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 2, quote: "التوصيل سريع والتركيب كان سلس.", name: "أحمد", role: "عميل", rating: 5, image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 3, quote: "خدمة العملاء متعاونة، أنصح بالموقع.", name: "سارة", role: "عميلة", rating: 4, image: "https://images.pexels.com/photos/4728682/pexels-photo-4728682.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 4, quote: "المنتج وصل في وقت قياسي والجودة ممتازة.", name: "ليلى", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 5, quote: "أنصح بالتسوق هنا، تجربة رائعة.", name: "خالد", role: "عميل", rating: 4, image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 6, quote: "المنتج مطابق للوصف تماماً.", name: "منة", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 7, quote: "خدمة سريعة وأسعار مناسبة.", name: "يوسف", role: "عميل", rating: 4, image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 8, quote: "تجربة شراء ممتازة، أنصح بها.", name: "نور", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 9, quote: "التواصل مع الدعم سريع ومفيد.", name: "رامي", role: "عميل", rating: 4, image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 10, quote: "التغليف ممتاز والمنتج وصل بحالة جيدة.", name: "هدى", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 11, quote: "التجربة رائعة وأكرر الشراء.", name: "علي", role: "عميل", rating: 5, image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 12, quote: "المنتج جيد ولكن التوصيل تأخر قليلاً.", name: "سلمى", role: "عميلة", rating: 4, image: "https://images.pexels.com/photos/4728682/pexels-photo-4728682.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 13, quote: "جودة المنتج ممتازة والسعر مناسب.", name: "زياد", role: "عميل", rating: 5, image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 14, quote: "خدمة العملاء ودودة ومتعاونة.", name: "لمى", role: "عميلة", rating: 4, image: "https://images.pexels.com/photos/31749851/pexels-photo-31749851.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 15, quote: "تجربة شراء ممتعة وسهلة.", name: "طارق", role: "عميل", rating: 5, image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 16, quote: "المنتج ممتاز والتوصيل سريع.", name: "جمانة", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 17, quote: "أنصح بالتسوق هنا للجميع.", name: "أيمن", role: "عميل", rating: 4, image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 18, quote: "التغليف كان ممتازاً والمنتج كما هو.", name: "هالة", role: "عميلة", rating: 5, image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 19, quote: "خدمة ممتازة وتجربة شراء سلسة.", name: "مروان", role: "عميل", rating: 5, image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 20, quote: "المنتج جيد، والتوصيل كان سريعاً.", name: "دينا", role: "عميلة", rating: 4, image: "https://images.pexels.com/photos/4728682/pexels-photo-4728682.jpeg?auto=compress&cs=tinysrgb&w=150" }
  ];

  // الألوان الخاصة بالهوية البصرية
  const colors = {
    bg: '#F3EEE8',      // White Linen
    text: '#101F30',    // Mirage
    accent: '#D8C2A7',  // Akaroa
    subText: '#A2B4C0', // Approx St sm / Qull Oray
    dark: '#2B1A0F',    // Creole (Corrected Hex)
  };

  // نكرر القائمة مرتين فقط للحصول على حلقة سلسة
  // عند الوصول لنهاية النسخة الأولى، نعيد الحركة للبداية فيظهر وكأنها مستمرة
  const loopReviews = [...reviewsMock, ...reviewsMock];

  return (
    <div 
      className="w-full min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden relative"
      style={{ backgroundColor: colors.bg }}
      dir="rtl"
    >
      {/* العنوان */}
      <div className="text-center mb-12 px-4 z-10">
        <h2 
          className="text-4xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          آراء عملائنا السعداء
        </h2>
        <p 
          className="text-lg"
          style={{ color: colors.subText }}
        >
          نفخر بثقتكم ونعتز بكلماتكم
        </p>
      </div>

      {/* حاوية السلايدر */}
      <div className="relative w-full max-w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        
        {/* الشريط المتحرك */}
        <div 
          className="flex items-center gap-6 animate-infinite-scroll hover:[animation-play-state:paused] w-max"
        >
          {loopReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[350px] md:w-[400px] p-8 rounded-2xl shadow-sm transition-transform duration-300 hover:scale-[1.02] bg-white relative flex flex-col justify-between h-[280px]"
              style={{ color: colors.text }}
            >
              {/* أيقونة الاقتباس */}
              <div className="absolute top-6 left-6 opacity-20">
                <Quote size={40} color={colors.accent} fill={colors.accent} />
              </div>

              {/* نص المراجعة */}
              <div className="relative z-10 mt-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < review.rating ? colors.accent : "none"}
                      color={i < review.rating ? colors.accent : colors.subText}
                    />
                  ))}
                </div>
                <p 
                  className="text-xl font-medium leading-relaxed"
                  style={{ color: colors.dark }}
                >
                  "{review.quote}"
                </p>
              </div>

              {/* معلومات العميل */}
              <div className="flex items-center gap-4 mt-6 border-t pt-4" style={{ borderColor: colors.bg }}>
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-2"
                  style={{ borderColor: colors.accent }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div>
                  <h4 
                    className="font-bold text-lg"
                    style={{ color: colors.text }}
                  >
                    {review.name}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: colors.subText }}
                  >
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ستايل الأنيميشن المخصص */}
      <style>{`
        @keyframes infinite-scroll {
          /* بما أن الموقع RTL، الاتجاه الموجب (TranslateX > 0) يحرك العنصر لليسار (باتجاه القراءة العكسي)
             لجعل الحركة انسيابية كشريط يمر، سنحرك من 0 إلى 50% (نصف العرض الإجمالي وهو عرض القائمة الأصلية)
          */
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); } 
        }
        .animate-infinite-scroll {
          /* تم زيادة الوقت إلى 120 ثانية للحصول على حركة بطيئة جداً وسلسة */
          animation: infinite-scroll 120s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;