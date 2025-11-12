"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

export default function SignUp() {
  const router = useRouter();
  const { login } = useAppContext();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const existingUser = registeredUsers.find((u) => u.email === formData.email);

    if (existingUser) {
      setError("This email is already registered. Please log in.");
      return;
    }

    // حفظ المستخدم الجديد بدون أي شروط للباسورد
    const updatedUsers = [...registeredUsers, formData];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // تسجيل الدخول مباشرة
    login(formData);

    toast.success("Account created successfully 🎉");

    // تحويل المستخدم للصفحة الرئيسية
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#14273E]"><Navbar/>
      <div className="bg-[#B7C7D6] p-8 rounded-2xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#14273E] flex justify-center items-center gap-2">
          <FaUserPlus className="text-[#E6CBA8]" /> Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-[#E6CBA8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] bg-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[#E6CBA8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] bg-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-[#E6CBA8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] bg-white"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-[#E6CBA8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6CBA8] bg-white"
          />

          {error && (
            <p className="text-center text-red-600 text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#E6CBA8] text-[#14273E] py-3 rounded-lg font-semibold hover:bg-[#d6b78f] transition"
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
      </div>
    </div>
  );
}
