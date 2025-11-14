'use client';

import {
  Bell,
  DollarSign,
  House,
  Info,
  Link as LinkIcon,
  Mail,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
  Link: LinkIcon,
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarItems, setSidebarItems] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  }, []);

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 260 : 80 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="relative z-10 flex-shrink-0 h-screen bg-[#0D1A2A] border-r border-[#14273E] shadow-lg flex flex-col"
    >
      {/* Header & Toggle */}
      <div className="flex items-center justify-between p-4">
        {isSidebarOpen && (
          <motion.h1
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[#D8C2A7] font-bold text-lg tracking-wider"
          >
            Admin Panel
          </motion.h1>
        )}

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl hover:bg-[#14273E] transition-colors cursor-pointer text-[#F3EEE8]"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-grow px-2">
        {sidebarItems.map((item, index) => {
          const IconComponent = ICONS[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.04 }}
                className={`group flex items-center gap-4 p-3 rounded-xl mb-2 cursor-pointer transition-all
                  ${isActive
                    ? "bg-[#14273E] text-[#D8C2A7] shadow-md"
                    : "text-[#EDE7DD] hover:bg-[#14273E]/60"
                  }
                `}
              >
                <IconComponent size={22} className="min-w-[22px]" />

                {/* Text */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap font-medium tracking-wide"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-xs text-[#A9B1C1] tracking-wide"
            >
              © 2025 All rights reserved.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
