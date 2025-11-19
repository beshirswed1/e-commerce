"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      setError("No account found. Please sign up first!");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
dispatch(login(savedUser));
alert("Login successful!");
router.push("/");

    } else {
      setError("Incorrect email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#14273E] px-4">
      <Navbar/>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-[#14273E] mb-6">
          Welcome 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg bg-[#B7C7D6]/20 focus:ring-2 focus:ring-[#14273E]"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#B7C7D6] rounded-lg bg-[#B7C7D6]/20 focus:ring-2 focus:ring-[#14273E]"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-[#E6CBA8] text-[#14273E] font-semibold py-2 rounded-lg hover:bg-[#B7C7D6] transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#14273E] mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-[#E6CBA8] font-semibold hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}