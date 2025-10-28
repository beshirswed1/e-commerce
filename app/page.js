// "use client";
import Image from "next/image";
import Sidebar from "./components/sidebar/sidebar";
import ProductCard from "./components/ProductCard";
// import { useEffect, useState } from "react";
export default function Home() {
  // const [products, setProducts] = useState([]);
  // useEffect(()=>{
  //   fetch('https://api.escuelajs.co/api/v1/products')
  //   .then(res=>res.json())
  //   .then(data=>{
  //     setProducts(data);
  //     console.log(data);
  //   })
  //   .catch(err=>alert('Error fetching products'));
  // },[])
  return (
    <div className="flex ">
      <Sidebar/>
      <main className="mostafa-task">
        <div className="search-filters">
        </div>
        <div className="products">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </main>
    </div>
  );
}
