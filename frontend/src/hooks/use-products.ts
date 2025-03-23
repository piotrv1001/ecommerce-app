import { Pagination } from "@/types/pagination";
import { Product } from "@/types/product";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const fetchProducts = async (
  { pageParam = null }: { pageParam?: string | null },
  search: string
) => {
  const params: Record<string, any> = {
    cursor: pageParam,
    limit: 10,
  };
  if (search) {
    params.search = search;
  }
  const res = await axios.get<Pagination<Product[]>>("/api/products", {
    params,
  });
  return res.data;
};

export const useProducts = (search: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      Pagination<Product[]>,
      Error,
      InfiniteData<Pagination<Product[]>>,
      readonly string[],
      string | null
    >({
      queryKey: ["products", search],
      queryFn: ({ pageParam }) => fetchProducts({ pageParam }, search),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: null,
    });
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return {
    products: data?.pages.flatMap((page) => page.data) ?? [],
    hasNextPage,
    isFetchingNextPage,
    ref,
  };
};
