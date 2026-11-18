import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CreateProductPayload,
  Product,
  ProductCardData,
  UpdateProductPayload,
} from "../types/product.types";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  type PaginatedProductCards,
} from "../services/productService";

function mapToCardData(item: Product): ProductCardData {
  return {
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail || "https://placehold.co/300x300?text=No+Image",
    price: item.price,
    discountPercentage: item.discountPercentage ?? 0,
    rating: item.rating ?? 0,
    category: item.category,
    brand: item.brand,
    availabilityStatus: item.availabilityStatus ?? "In Stock",
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => addProduct(payload),
    onSuccess: (newProduct) => {
      const newCard = mapToCardData(newProduct);

      queryClient.setQueriesData<PaginatedProductCards>(
        {
          queryKey: ["products"],
        },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            products: [newCard, ...oldData.products],
            total: oldData.total + 1,
          };
        },
      );

      queryClient.setQueryData<Product>(["product", newProduct.id], newProduct);
    },
  });
}

interface UpdateMutationVariables {
  id: number;
  payload: UpdateProductPayload;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateMutationVariables) =>
      updateProduct(id, payload),
    onSuccess: (updatedProduct, variables) => {
      // A. Update cache halaman detail ["product", id]
      queryClient.setQueryData<Product>(
        ["product", variables.id],
        (oldDetail) => ({ ...oldDetail, ...updatedProduct }),
      );

      //B. Update item terkait di semua cache list ["products"]
      const updatedCard = mapToCardData(updatedProduct);
      queryClient.setQueriesData<PaginatedProductCards>(
        { queryKey: ["products"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            products: oldData.products.map((item) =>
              item.id === variables.id ? { ...item, ...updatedCard } : item,
            ),
          };
        },
      );
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ["product", deletedId] });

      queryClient.setQueriesData<PaginatedProductCards>(
        { queryKey: ["products"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            products: oldData.products.filter((item) => item.id !== deletedId),
            total: Math.max(0, oldData.total - 1),
          };
        },
      );
    },
  });
}
