import ProductList from "@/components/product-list";
import Container from "@/components/container";
import { useProducts } from "./hooks/use-products";
import ProductSearchBar from "./components/product-search-bar";

export default function App() {
  const { products, search, updateSearch, fetchProducts } = useProducts();

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <ProductSearchBar
        search={search}
        onSearchChange={updateSearch}
        onSubmit={fetchProducts}
      />
      <Container className="flex flex-col gap-y-4 flex-1 overflow-y-auto">
        <ProductList products={products} />
      </Container>
    </div>
  );
}
