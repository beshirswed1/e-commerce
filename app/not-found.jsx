import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[#F3EEE8] flex items-center justify-center p-6">
            <div className="bg-[#101F30] text-[#F3EEE8] rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2 border border-[#D8C2A7]/30">

                {/*  الصورة اللي بتظهر لما الصفحة مش موجودة */}
                <div className="flex items-center justify-center p-10 bg-[#14273E]/80">
                    <img
                        src="/images/error-illustration.svg"
                        alt="Error Illustration"
                        className="w-80 h-auto drop-shadow-lg opacity-90"
                    />
                </div>

                {/*  النصوص */}
                <div className="p-12 flex flex-col justify-center text-center md:text-right">
                    <h1 className="text-6xl font-extrabold text-[#D8C2A7] mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-[#F3EEE8] mb-3">
                        الصفحة مش موجودة 
                    </h2>
                    <p className="text-[#A2B4C0] mb-10 leading-relaxed text-lg">
                        باين إن الصفحة اللي بتدور عليها مش موجودة أو اتنقلت لمكان تاني.  
                        ارجع للرئيسية وجرب تلاقي اللي محتاجه 
                    </p>

                    {/*  الزر اللي بيرجع المستخدم لأول صفحة */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-[#D8C2A7] text-[#101F30] px-8 py-3 rounded-xl font-semibold hover:bg-[#A2B4C0] hover:text-white transition-all duration-200 shadow-md"
                    >
                        <Home size={22} />
                        العودة للرئيسية
                    </Link>
                </div>
            </div>
        </div>
    );
}
