"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Mail } from "lucide-react";

export default function HelpPage() {
    const faqs = [
        {
            question: "إزاي أقدر أعمل حساب جديد؟",
            answer:
                "تقدر تعمل حساب بسهولة عن طريق الضغط على زر Sign Up من الصفحة الرئيسية وملء البيانات المطلوبة زي الاسم والإيميل وكلمة السر.",
        },
        {
            question: "نسيت الباسورد، أعمل إيه؟",
            answer:
                "مفيش مشكلة، دوس على Forgot Password وهنبعتلك لينك على الإيميل عشان تعين كلمة مرور جديدة.",
        },
        {
            question: "إزاي أتواصل مع الدعم الفني؟",
            answer:
                "تقدر تبعتلنا في أي وقت على الإيميل support@example.com أو من خلال صفحة Contact Us.",
        },
        {
            question: "هل ممكن أعدل بياناتي الشخصية؟",
            answer:
                "أيوه، تقدر تدخل على صفحة Profile ومنها تختار Edit Profile وتغير اللي انت عايزه.",
        },
        {
            question: "هل المنصة آمنة لحفظ البيانات؟",
            answer:
                "أكيد، كل بياناتك متشفرة ومحمية بأحدث تقنيات الأمان لضمان خصوصيتك التامة.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#14273E] text-white flex flex-col items-center justify-start py-16 px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center mb-10"
            >
                <h1 className="text-5xl font-extrabold text-[#E6CBA8] mb-4">
                    Help
                </h1>
                <p className="text-[#B7C7D6] text-lg leading-relaxed">
                    محتاج مساعدة؟ هنا هتلاقي كل الإجابات اللي ممكن تدور عليها،
                    أو تقدر تبعتلنا مباشرة لو لسه محتاج توصل للدعم الفني.
                </p>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-2xl mb-10"
            >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B7C7D6]" />
                <input
                    type="text"
                    placeholder="ابحث عن سؤالك هنا..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#14273E] text-[#E6CBA8] placeholder-[#B7C7D6] rounded-2xl py-3 pl-12 pr-4 text-lg border border-[#B7C7D6] focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] transition-all duration-300"
                />
            </motion.div>

            {/* FAQ List */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl space-y-4"
            >
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            layout
                            transition={{
                                layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                            }}
                            className="border border-[#B7C7D6]/40 rounded-2xl overflow-hidden bg-[#14273E] hover:border-[#E6CBA8]/70 transition-all shadow-lg"
                        >
                            {/* السؤال */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center text-left p-5 text-[#E6CBA8] font-semibold text-lg"
                            >
                                {faq.question}
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ChevronDown />
                                </motion.div>
                            </button>

                            {/* الإجابة */}
                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                        className="p-5 text-[#B7C7D6] bg-[#14273E] border-t border-[#B7C7D6]/30 leading-relaxed"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-[#B7C7D6] text-lg">لا يوجد سوال  بهذا الشكل</p>
                )}
            </motion.div>

            {/* Contact */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 text-center"
            >
                <p className="text-[#B7C7D6] text-lg mb-3">
                    لسه محتاج مساعدة ابعت على
                </p>
                <div className="flex justify-center items-center gap-2 text-[#E6CBA8] text-xl font-semibold">
                    <Mail size={20} /> gamalwalid832@gmail.com
                </div>
            </motion.div>
        </div>
    );
}
