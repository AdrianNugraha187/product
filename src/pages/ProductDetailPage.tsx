import { useNavigate } from "@tanstack/react-router";
import { useProductDetail } from "../hooks/useProductDetail";
import { useState } from "react";
import {
  useDeleteProduct,
  useUpdateProduct,
} from "../hooks/useProductMutations";
import type { CreateProductPayload } from "../types/product.types";
import ProductForm from "../components/ProductForm";

interface ProductDetailPageProps {
  productId: number;
}

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(productId);

  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

  function handleUpdate(payload: CreateProductPayload) {
    updateMutation.mutate(
      { id: productId, payload },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Yakin ingin menghapus "${product?.title}"?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate(productId, {
      onSuccess: () => {
        navigate({ to: "/" });
      },
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsEditing((prev) => !prev)}
        disabled={updateMutation.isPending || deleteMutation.isPending}
      >
        {isEditing ? "Batal Edit" : "Edit Produk"}
      </button>

      {!isEditing && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Menghapus..." : "Hapus Produk"}
        </button>
      )}

      {deleteMutation.isError && (
        <p role="alert">Gagal menghapus: {deleteMutation.error.message}</p>
      )}

      {/* Tampilkan Form jika mode Edit aktif, atau tampilkan Detail Produk */}
      {isEditing ? (
        <div>
          <h2>Edit Produk</h2>
          <ProductForm
            initialData={product}
            onSubmit={handleUpdate}
            isSubmitting={updateMutation.isPending}
            errorMessage={
              updateMutation.isError ? updateMutation.error.message : null
            }
          />
        </div>
      ) : (
        <div>
          <img src={product.thumbnail} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Kategori: {product.category}</p>
          {product.brand && <p>Brand: {product.brand}</p>}
          <p>Harga: ${product.price}</p>
          <p>Stok: {product.stock}</p>
        </div>
      )}
    </div>
  );
}
