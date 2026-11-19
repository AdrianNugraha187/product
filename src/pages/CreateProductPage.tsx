import { useNavigate } from "@tanstack/react-router";
import { useCreateProduct } from "../hooks/useProductMutations";
import type { CreateProductPayload } from "../types/product.types";
import ProductForm from "../components/ProductForm";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useCreateProduct();

  function handleCreate(payload: CreateProductPayload) {
    mutate(payload, {
      onSuccess: () => {
        navigate({ to: "/" });
      },
    });
  }

  return (
    <div>
      <h1>Tambah Produk Baru</h1>
      <ProductForm
        onSubmit={handleCreate}
        isSubmitting={isPending}
        errorMessage={isError ? error.message : null}
        submitLabel="Tambah Produk"
      />
    </div>
  );
}
