import Sidebar from "./components/sidebar/sidebar";
import ProductCard from "./components/ProductCard";
import Slider from "./components/Slider";
export default async function Home() {
      const res = await fetch("https://fakestoreapi.com/products",{next:{revalidate:70}});
      const products = await res.json();
  return (
    <div className="flex ">
      <Sidebar/>
      <main className="mostafa-task">
        <Slider/>
        <div className="search-filters">
          <div className="search"></div>
          <div className="filters"></div>
        </div>
        <div className="products">
          {
            products.map((pro,i)=><ProductCard key={i} product={pro}/>)
          }
        </div>
      </main>
    </div>
  );
}
