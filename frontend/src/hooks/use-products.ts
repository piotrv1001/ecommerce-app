import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      let apiEndpoint = "/api/products";
      if (search) {
        apiEndpoint += `?search=${search}`;
      }
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return { products, search, updateSearch, fetchProducts };
};
