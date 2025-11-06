import React, { useRef } from "react";
import Link from "next/link";

export default function CategoryItem({
  name = "Unknown",
  hoverColor = "#E6CBA8",
  textColor = "#1a1a1a",
  borderColor = "#E6CBA8",
}) {
  const rippleRef = useRef(null);

  const createRipple = (e) => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = e.currentTarget.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    rippleRef.current.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <li
      style={{
        listStyle: "none",
        margin: "0.4rem 0",
      }}
    >
      <Link
        href={`/category/${encodeURIComponent(name)}`}
        aria-label={`Category: ${name}`}
        onClick={createRipple}
        ref={rippleRef}
        className="category-link"
        style={{
          display: "block",
          width: "100%",
          padding: "0.9rem 1.2rem",
          borderRadius: "16px",
          border: `1px solid ${borderColor}33`,
          color: textColor,
          textTransform: "capitalize",
          fontSize: "clamp(14px, 2vw, 18px)",
          fontWeight: 500,
          letterSpacing: "0.3px",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(145deg, rgba(255,255,255,0.5), rgba(245,245,245,0.3))`,
          backdropFilter: "blur(10px)",
          boxShadow: `
            inset 0 0 0.5px rgba(255,255,255,0.5),
            inset 0 0 4px rgba(255,255,255,0.3),
            2px 2px 8px rgba(0,0,0,0.08),
            -2px -2px 8px rgba(255,255,255,0.3)
          `,
          transition:
            "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.3s ease",
          cursor: "pointer",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `linear-gradient(135deg, ${hoverColor}44, ${hoverColor}11)`;
          e.currentTarget.style.color = hoverColor;
          e.currentTarget.style.boxShadow = `
            inset 0 0 1px ${hoverColor}66,
            0 4px 10px ${hoverColor}33,
            -2px -2px 8px rgba(255,255,255,0.5)
          `;
          e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `linear-gradient(145deg, rgba(255,255,255,0.5), rgba(245,245,245,0.3))`;
          e.currentTarget.style.color = textColor;
          e.currentTarget.style.boxShadow = `
            inset 0 0 0.5px rgba(255,255,255,0.5),
            inset 0 0 4px rgba(255,255,255,0.3),
            2px 2px 8px rgba(0,0,0,0.08),
            -2px -2px 8px rgba(255,255,255,0.3)
          `;
          e.currentTarget.style.transform = "translateY(0) scale(1)";
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = `2px solid ${hoverColor}`;
          e.currentTarget.style.outlineOffset = "2px";
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = "none";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Ripple effect container */}
        <style jsx>{`
          .category-link .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: ${hoverColor}66;
            width: 100px;
            height: 100px;
            opacity: 0.75;
          }
          @keyframes ripple {
            to {
              transform: scale(3);
              opacity: 0;
            }
          }
        `}</style>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              content: "''",
              display: "inline-block",
              width: "0.5rem",
              height: "0.5rem",
              background: hoverColor,
              borderRadius: "50%",
              transition: "all 0.3s ease",
            }}
            className="dot"
          ></span>
          {name}
        </span>

        {/* subtle arrow on hover */}
        <span
          className="arrow"
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%) translateX(6px)",
            opacity: 0,
            transition: "all 0.3s ease",
            fontSize: "1rem",
            color: hoverColor,
          }}
        >
          →
        </span>

        <style jsx>{`
          .category-link:hover .arrow {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
          .category-link:hover .dot {
            transform: scale(1.4);
            background: ${hoverColor};
          }
          @media (max-width: 768px) {
            .category-link {
              padding: 0.8rem 1rem;
              font-size: 16px;
            }
          }
          @media (max-width: 480px) {
            .category-link {
              font-size: 15px;
              padding: 0.7rem 0.8rem;
              box-shadow: none;
              border-radius: 12px;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .category-link,
            .arrow,
            .dot {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>
      </Link>
    </li>
  );
}
