import ProductList from "@/components/product-list";
import Container from "@/components/container";
import { useProducts } from "@/hooks/use-products";
import ProductSearchBar from "@/components/product-search-bar";
import { LoaderCircleIcon } from "lucide-react";

export default function ProductsContainer() {
  const {
    products,
    search,
    updateSearch,
    fetchProducts,
    ref,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();
  return (
    <div className="flex flex-col overflow-hidden h-full">
      <ProductSearchBar
        search={search}
        onSearchChange={updateSearch}
        onSubmit={fetchProducts}
      />
      <Container className="flex flex-col gap-y-4 flex-1 overflow-y-auto">
        <ProductList products={products} />
        {hasNextPage && (
          <div ref={ref} className="p-4 text-center">
            {isFetchingNextPage && (
              <LoaderCircleIcon className="animate-spin size-6 mx-auto" />
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
