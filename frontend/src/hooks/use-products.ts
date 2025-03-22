import { Pagination } from "@/types/pagination";
import { Product } from "@/types/product";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const fetchProducts = async (
  { pageParam }: { pageParam?: string | null },
  search: string
) => {
  let apiEndpoint = "/api/products";
  if (search) {
    apiEndpoint += `?search=${search}`;
  }
  const res = await axios.get<Pagination<Product[]>>(apiEndpoint, {
    params: { cursor: pageParam, limit: 10 },
  });
  return res.data;
};

export const useProducts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery<
      Pagination<Product[]>,
      Error,
      InfiniteData<Pagination<Product[]>>,
      readonly string[],
      string | null
    >({
      queryKey: ["products"],
      queryFn: (e) => fetchProducts(e, search),
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
    hasNextPage,
    isFetchingNextPage,
    ref,
    refetch,
  };
};
