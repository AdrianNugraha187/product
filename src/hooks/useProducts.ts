import { useQuery } from "@tanstack/react-query";
import { getProducts, searchProducts } from "../services/productService";

export function useProducts(query?: string, limit = 16, skip = 0) {
  const cleanQuery = query?.trim() ?? "";
  return useQuery({
    queryKey: ["products", { query: cleanQuery, limit, skip }],
    queryFn: ({ signal }) => {
      return cleanQuery
        ? searchProducts({ query: cleanQuery, limit, skip })
        : getProducts({ limit, skip, signal });
    },
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    placeholderData: (prev) => prev,
  });
}
