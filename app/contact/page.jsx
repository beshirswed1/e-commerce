"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-[#14273E]">
      <Navbar/>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#FFFFFF] rounded-2xl shadow-2xl w-[90%] sm:w-[450px] p-8"
      >
        <h2 className="text-3xl font-bold text-center text-[#14273E] mb-6">
          Contact Us
        </h2>
        <form className="flex flex-col space-y-5">
          <div>
            <label className="block text-[#14273E] mb-2 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14273E] bg-[#B7C7D6]/20"
            />
          </div>

          <div>
            <label className="block text-[#14273E] mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14273E] bg-[#B7C7D6]/20"
            />
          </div>

          <div>
            <label className="block text-[#14273E] mb-2 font-medium">Message</label>
            <textarea
              placeholder="Write your message..."
              rows="4"
              className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14273E] bg-[#B7C7D6]/20"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#E6CBA8] text-[#14273E] font-semibold py-2 rounded-lg hover:bg-[#B7C7D6] transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
