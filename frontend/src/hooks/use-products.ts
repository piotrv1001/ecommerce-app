import { Pagination } from "@/types/pagination";
import { Product } from "@/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const fetchProducts = async ({ pageParam }: { pageParam?: string | null }) => {
  const res = await axios.get<Pagination<Product[]>>("/api/products", {
    params: { cursor: pageParam, limit: 10 },
  });
  return res.data;
};

export const useProducts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: null,
    });
  const [search, setSearch] = useState("");
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return {
    products: data?.pages.flatMap((page) => page.data) ?? [],
    search,
    updateSearch,
    fetchProducts: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ref,
  };
};
