import Link from "next/link";
export default function ProductCard({product}) {
  return (
    <div className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <Link href={""}>buy</Link>
    </div>
  );
}