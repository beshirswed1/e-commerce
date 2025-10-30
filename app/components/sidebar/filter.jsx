    "use client";

    import React, { useState } from "react";
    import Link from "next/link";
    import { usePathname } from "next/navigation";

    // Component for individual category item
    const CategoryItem = ({ name }) => {
        const pathname = usePathname();
        // Check if this category is currently active/open
        const active = pathname.includes(`/category/${encodeURIComponent(name)}`);

        return (
            <li>
                <Link
                    href={`/category/${encodeURIComponent(name)}`}
                    className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium capitalize transition-all duration-300 ease-in-out ${
                        active
                            ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-[1.03]"
                            : "bg-gray-800 text-gray-300 hover:bg-indigo-500/70 hover:text-white hover:scale-[1.02]"
                    }`}
                >
                    {/* Small circle indicator for active category */}
                    <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            active ? "bg-white" : "bg-gray-500 group-hover:bg-white"
                        }`}
                    ></span>
                    {/* Category name */}
                    <span className="truncate">{name}</span>
                </Link>
            </li>
        );
    };

    // SVG Icons
    const SearchIcon = (props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
        </svg>
    );

    const StarIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
            />
        </svg>
    );

    const FilterIcon = (props) => <img src="/filter.svg" alt="Filter Icon" {...props} />;

    // Rating Filter component
    const RatingFilter = ({ minRating, setMinRating }) => {
        const stars = [1, 2, 3, 4, 5];
        const handleStarClick = (rating) => setMinRating(minRating === rating ? 0 : rating);

        return (
            <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800 border-b border-blue-100 pb-1">التقييم الأدنى</h3>
                <div className="flex justify-center p-4 bg-blue-50 rounded-2xl shadow-inner">
                    {stars.map((r) => (
                        <div
                            key={r}
                            className={`cursor-pointer mx-1 transition-transform duration-200 ${
                                r <= minRating ? "text-yellow-500 scale-105" : "text-gray-300 hover:text-yellow-400"
                            }`}
                            onClick={() => handleStarClick(r)}
                        >
                            <StarIcon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                    ))}
                </div>
                <div className="text-center text-sm text-gray-600">
                    {minRating > 0 ? `${minRating} نجوم وما فوق` : "لم يتم تحديد تقييم بعد"}
                </div>
            </div>
        );
    };

    // Sidebar filter component
    export default function SidebarFilter({ searchTerm, setSearchTerm, priceRange, setPriceRange, minRating, setMinRating }) {
    const handleClearFilters = () => {
        setSearchTerm("");
        setPriceRange(100);
        setMinRating(0);
    };

        return (
        <aside className="md:sticky md:top-24 md:h-[calc(100vh-6rem)] w-full md:w-72 flex-shrink-0 bg-[#F3EEE8] p-4 md:p-0">
        <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl p-5 space-y-6 md:overflow-hidden">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center p-2">
                <FilterIcon className="w-6 h-6 text-blue-600" /> تصفية
            </h2>
            <button
                onClick={handleClearFilters}
                className="py-1 px-3 text-xs font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition"
            >
                مسح الكل
            </button>
            </div>

            <div className="relative">
            <input
                type="text"
                placeholder="بحث..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pr-10 pl-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-200 outline-none text-sm text-gray-800"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
            </div>

            <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>السعر الأقصى</span>
    <span className="text-blue-600 font-bold">
    ${Number(priceRange || 0).toFixed(0)}
    </span>
            </div>
            <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={priceRange}
                onChange={(e) => setPriceRange(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
                <span>$0</span>
                <span>$1000+</span>
            </div>
            </div>

            <RatingFilter minRating={minRating} setMinRating={setMinRating} />

            <div className="mt-auto pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
    بحث: <strong>{searchTerm || "الكل"}</strong> | سعر ≤ ${Number(priceRange || 0)} | تقييم ≥ {minRating}
            </div>
        </div>
        </aside>
    );
    }