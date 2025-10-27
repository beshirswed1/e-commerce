// components/CategoryItem.jsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryItem = ({ name }) => {
  const pathname = usePathname();

  //  بنشوف هل الكاتيجوري دي هي المفتوحة دلوقتي ولا لأ
  const active = pathname.includes(`/category/${encodeURIComponent(name)}`);

  return (
    <li>
      <Link
        href={`/category/${encodeURIComponent(name)}`}
        // استايل الكاتيجوري (ألوان وحركات)
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium capitalize transition-all duration-300 ease-in-out
          ${active
            ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.03]" //  لو الكاتيجوري المفتوحة
            : "bg-gray-800 text-gray-300 hover:bg-indigo-500/70 hover:text-white hover:scale-[1.02]"
          }
        `}
      >
        {/*  دايرة صغيرة كده بتتحرك لو الكاتيجوري دي Active */}
        <span
          className={`w-2 h-2 rounded-full transition-all duration-300 ${active ? "bg-white" : "bg-gray-500 group-hover:bg-white"
            }`}
        ></span>

        {/*  اسم الكاتيجوري */}
        <span className="truncate">{name}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;
