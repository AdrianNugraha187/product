import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";

export function useProductDetail(id?: number) {
  const isValidId = typeof id === "number" && Number.isInteger(id) && id > 0;
  return useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => getProductById(id!, signal),
    enabled: isValidId,
    staleTime: 1000 * 60 * 15, // Samakan 15 menit agar tidak refetch berulang saat bolak-balik halaman
    gcTime: 1000 * 60 * 30,
  });
}
