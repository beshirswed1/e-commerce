"use client";
import React from "react";
import Link from "next/link";
const CategoryItem = ({ name }) => {
  return (
    <li className="hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
        <Link 
            href={`/category/${encodeURIComponent(name)}`}
            className="block hover:bg-gray-700 rounded px-2 py-1 cursor-pointer"
        >
            {name}
        </Link>
    </li>
  );
};

export default CategoryItem;
