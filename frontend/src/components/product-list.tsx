import { Product } from "@/types/product";
import ProductCard from "./product-card";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full flex-1">
          {products.map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-2 h-full flex flex-col items-center justify-center">
          <h1 className="text-lg font-semibold">No results found</h1>
          <p className="text-muted-foreground text-sm">
            Try a different search query
          </p>
        </div>
      )}
    </>
  );
}
