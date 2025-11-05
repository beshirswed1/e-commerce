import React from "react";

export default function CategoryItem({ name = "unknown", className = "" , onClick}) {
  // الافتراضي: عندما يضغط المستخدم نعطيه console.log أو نقدر نمرر onClick من الأب
  return (
    <li>
      <button
        onClick={() => {
          if (typeof onClick === "function") return onClick(name);
          // افتراضي: فلترة أو ذهاب لصفحة - غير مطلوب الآن، نعرض console
          console.log("selected category:", name);
        }}
        className={
          "w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-sm capitalize " +
          className
        }
      >
        {name}
      </button>
    </li>
  );
}
