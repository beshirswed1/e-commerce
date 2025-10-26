"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const name = decodeURIComponent(params.name); // فك الترميز

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const filtered = data.filter((item) => item.category === name);
        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchProducts();
  }, [name]);

  if (error) return <div>Failed to load products.</div>;
  if (!products.length) return <div>Loading products...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {products.map((item) => (
        <div key={item.id} className="border p-4 rounded shadow">
          <img src={item.image} alt={item.title} className="w-full h-48 object-contain" />
          <h3 className="mt-2 font-bold">{item.title}</h3>
          <p className="text-gray-700">${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
