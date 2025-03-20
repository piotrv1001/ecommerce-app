import { useProducts } from "@/hooks/use-products";
import ProductCard from "./product-card";

export default function ProductList() {
  const { products } = useProducts();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <li key={product.title}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
