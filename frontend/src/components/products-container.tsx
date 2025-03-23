import ProductList from "@/components/product-list";
import { useProducts } from "@/hooks/use-products";
import ProductSearchBar from "@/components/product-search-bar";
import { LoaderCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "@/stores/use-auth-store";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductsContainer() {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { token, logout } = useAuthStore();
  const isLoggedIn = !!token;
  const { products, ref, hasNextPage, isFetchingNextPage } =
    useProducts(searchQuery);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleSubmit = () => {
    setSearchQuery(search);
  };

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <div className="flex items-center gap-x-4 bg-gray-200 p-4">
        <ProductSearchBar
          search={search}
          onSearchChange={setSearch}
          onSubmit={handleSubmit}
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
