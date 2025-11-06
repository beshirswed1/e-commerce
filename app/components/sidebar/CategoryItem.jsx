import React from "react";
import Link from "next/link";

export default function CategoryItem({
  name = "Unknown",
  hoverColor = "#D8C2A7",
  textColor = "#F3EEE8",
  borderColor = "#D8C2A7",
}) {
  return (
    <li>
      <Link
        href={`/category/${encodeURIComponent(name)}`}
        className="block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 capitalize border border-transparent"
        style={{
          color: textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${hoverColor}22`;
          e.currentTarget.style.borderColor = hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        {name}
      </Link>
    </li>
  );
}
