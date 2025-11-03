import Sidebar from "./components/sidebar/sidebar";
import ProductCard from "./components/ProductCard";
import Slider from "./components/Slider";

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 70 },
  });
  const products = await res.json();

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8">
        {/* شغل مصطفى */}
        <section className="mostafa-task">
          <Slider />
          <div className="search-filters flex justify-between items-center mb-4">
            <div className="search"></div>
            <div className="filters"></div>
          </div>

          <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((pro, i) => (
              <ProductCard key={i} product={pro} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
