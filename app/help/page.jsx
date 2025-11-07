"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Send } from "lucide-react";

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
    const [showForm, setShowForm] = useState(false);
    const [question, setQuestion] = useState("");

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSend = () => {
        if (!question.trim()) return alert("من فضلك اكتب سؤالك الأول!");
        alert("تم إرسال سؤالك ✅");
        setQuestion("");
        setShowForm(false);
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#14273E] text-white flex flex-col items-center justify-start py-20 px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl text-center mb-14"
            >
                <h1 className="text-6xl font-extrabold text-[#E6CBA8] mb-6">
                    Help
                </h1>
                <p className="text-[#B7C7D6] text-xl leading-relaxed">
                    محتاج مساعدة؟ هنا هتلاقي كل الإجابات اللي ممكن تدور عليها،
                    أو تقدر تبعتلنا سؤالك لو لسه محتاج مساعدة.
                </p>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-3xl mb-14"
            >
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#B7C7D6]" />
                <input
                    type="text"
                    placeholder="ابحث عن سؤالك هنا..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#14273E] text-[#E6CBA8] placeholder-[#B7C7D6] rounded-3xl py-4 pl-14 pr-5 text-xl border border-[#B7C7D6] focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] transition-all duration-300"
                />
            </motion.div>

            {/* FAQ List */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl space-y-5"
            >
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            layout
                            transition={{
                                layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                            }}
                            className="border border-[#B7C7D6]/40 rounded-3xl overflow-hidden bg-[#14273E] hover:border-[#E6CBA8]/70 transition-all shadow-lg"
                        >
                            {/* السؤال */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center text-left p-6 text-[#E6CBA8] font-semibold text-2xl"
                            >
                                {faq.question}
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ChevronDown size={26} />
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
                                        className="p-6 text-[#B7C7D6] bg-[#14273E] border-t border-[#B7C7D6]/30 leading-relaxed text-lg"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-[#B7C7D6] text-xl">
                        لا يوجد سؤال بهذا الشكل
                    </p>
                )}
            </motion.div>

            {/* زرار إرسال سؤال */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20 text-center"
            >
                <motion.button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#E6CBA8] text-[#14273E] px-10 py-4 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-[#f0d9b6] transition-all shadow-xl mx-auto text-xl"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Send size={26} />
                    ابعت سؤالك
                </motion.button>

                {/* فورم السؤال */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.4 }}
                            className="mt-8 bg-[#1B3558] p-8 rounded-3xl max-w-2xl mx-auto shadow-2xl border border-[#B7C7D6]/30"
                        >
                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="اكتب سؤالك هنا..."
                                className="w-full p-5 rounded-2xl bg-[#14273E] text-[#E6CBA8] border border-[#B7C7D6]/40 focus:ring-2 focus:ring-[#E6CBA8] outline-none resize-none text-lg"
                                rows={5}
                            />
                            <button
                                onClick={handleSend}
                                className="mt-5 bg-[#E6CBA8] text-[#14273E] px-10 py-3 rounded-2xl font-semibold hover:bg-[#f0d9b6] transition-all text-lg"
                            >
                                إرسال
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
