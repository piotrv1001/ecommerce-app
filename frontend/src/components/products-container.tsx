import ProductList from "@/components/product-list";
import { useProducts } from "@/hooks/use-products";
import ProductSearchBar from "@/components/product-search-bar";
import { LoaderCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "@/stores/use-auth-store";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function ProductsContainer() {
  const { token, logout } = useAuthStore();
  const isLoggedIn = !!token;
  const {
    products,
    search,
    updateSearch,
    refetch,
    ref,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <div className="flex items-center gap-x-4 bg-gray-200 p-4">
        <ProductSearchBar
          search={search}
          onSearchChange={updateSearch}
          onSubmit={refetch}
        />
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-y-4 flex-1 overflow-y-auto p-4">
        <ProductList products={products} />
        {hasNextPage && (
          <div ref={ref} className="p-4 text-center">
            {isFetchingNextPage && (
              <LoaderCircleIcon className="animate-spin size-6 mx-auto" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
