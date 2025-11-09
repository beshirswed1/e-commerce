"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import { FaUser, FaUserPlus, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const { user, getCartCount } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Help", href: "/help" },
  ];

  return (
    <nav className="bg-[#B7C7D6] shadow-md sticky top-0 z-50 px-6 md:px-16 lg:px-32 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1
        className="font-bold text-xl text-black cursor-pointer select-none"
        onClick={() => router.push("/")}
      >
        Logo
      </h1>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 text-[#E6CBA8]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-[#14273E] transition-colors no-underline"
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Icons + Auth */}
      <div className="flex items-center gap-4">
        {/* Cart */}
        <button
          onClick={() => router.push("/cart")}
          className="relative flex items-center bg-[#14273E] text-[#E6CBA8] px-3 py-1.5 rounded-md hover:text-[#B7C7D6] transition-all duration-200"
        >
          <FaShoppingCart size={18} />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold px-1.5 rounded-full">
              {getCartCount()}
            </span>
          )}
        </button>

        {!user ? (
          <>
            {/* Login */}
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-[#14273E] text-[#E6CBA8] px-3 py-1.5 rounded-md hover:text-[#B7C7D6] transition-all duration-200"
            >
              <FaUser size={18} />
              <span className="hidden md:inline font-medium">Login</span>
            </button>

            {/* Sign Up */}
            <button
              onClick={() => router.push("/signup")}
              className="flex items-center gap-2 bg-[#14273E] text-[#E6CBA8] px-3 py-1.5 rounded-md hover:text-[#B7C7D6] transition-all duration-200"
            >
              <FaUserPlus size={18} />
              <span className="hidden md:inline font-medium">Sign Up</span>
            </button>
          </>
        ) : (
          // Profile
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 bg-[#14273E] text-[#E6CBA8] px-3 py-1.5 rounded-md hover:text-[#B7C7D6] transition-all duration-200"
          >
            <FaUser size={18} />
            <span className="hidden md:inline font-medium">Profile</span>
          </button>
        )}

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-[#E6CBA8]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#14273E] flex flex-col items-center py-4 md:hidden shadow-lg space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-[#E6CBA8] hover:text-[#B7C7D6] transition-colors w-full text-center no-underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}

          {!user ? (
            <>
              <button
                onClick={() => { router.push("/login"); setMenuOpen(false); }}
                className="w-full py-2 bg-[#14273E] text-[#E6CBA8] rounded-md flex items-center justify-center gap-2"
              >
                <FaUser size={18} />
                Login
              </button>

              <button
                onClick={() => { router.push("/signup"); setMenuOpen(false); }}
                className="w-full py-2 bg-[#14273E] text-[#E6CBA8] rounded-md flex items-center justify-center gap-2"
              >
                <FaUserPlus size={18} />
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => { router.push("/profile"); setMenuOpen(false); }}
              className="w-full py-2 bg-[#14273E] text-[#E6CBA8] rounded-md flex items-center justify-center gap-2"
            >
              <FaUser size={18} />
              Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;