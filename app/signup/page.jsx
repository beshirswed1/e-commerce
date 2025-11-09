"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function SignUpPage() {
  const { login } = useAppContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // تحقق من تطابق الباسورد
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // تحقق من قوة الباسورد
    const passwordRegex = /^(?=.[A-Za-z])(?=.\d).{6,}$/; 
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 6 characters, include letters and numbers."
      );
      return;
    }

    // استرجاع المستخدمين المسجلين
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // التحقق إن الإيميل مش متسجل قبل كده
    const existingUser = users.find((u) => u.email === formData.email);
    if (existingUser) {
      setError("This email is already registered. Please login instead.");
      return;
    }

    // حفظ المستخدم الجديد
    const updatedUsers = [...users, formData];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // تسجيل الدخول تلقائي
    login(formData);

    // رسالة نجاح
    setSuccess("🎉 Account created successfully! Redirecting to login...");
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#14273E] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-[#B7C7D6]"
      >
        <h2 className="text-3xl font-bold text-center text-[#14273E] mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg bg-[#B7C7D6]/20 focus:ring-2 focus:ring-[#14273E]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg bg-[#B7C7D6]/20 focus:ring-2 focus:ring-[#14273E]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg bg-[#B7C7D6]/20 focus:ring-2 focus:ring-[#14273E]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg bg-[#B7C7D6]/20 focus:ring-2 focus:ring-[#14273E]"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="bg-[#E6CBA8] text-[#14273E] font-semibold py-2 rounded-lg hover:bg-[#B7C7D6] transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-[#14273E] mt-5">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#E6CBA8] font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}