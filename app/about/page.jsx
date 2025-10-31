"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#14273E] px-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl p-8 border border-[#B7C7D6]"
      >
        <h1 className="text-4xl font-bold text-[#E6CBA8] mb-6 text-center">
          About Us
        </h1>

        <p className="text-[#14273E] text-lg mb-4">
          Welcome to our platform! We are dedicated to providing the best 
          experience for our users. Our mission is to create an elegant, 
          user-friendly interface while maintaining modern design standards.
        </p>

        <p className="text-[#14273E] text-lg mb-4">
          Our team consists of passionate developers and designers who 
          strive to deliver high-quality products. We value your feedback 
          and continuously work on improving our services.
        </p>

        <p className="text-[#14273E] text-lg">
          Thank you for visiting our website. We hope you enjoy using our platform!
        </p>
      </motion.div>
    </div>
  );
}
