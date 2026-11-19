import React, { useState } from "react";
import type { CreateProductPayload, Product } from "../types/product.types";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (payload: CreateProductPayload) => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  submitLabel?: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
  submitLabel = "Simpan Produk",
}): ProductFormProps {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [brand, setBrand] = useState(initialData?.brand ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [price, setPrice] = useState(
    initialData?.price !== undefined ? String(initialData.price) : "",
  );
  const [discountPercentage, setDiscountPercentage] = useState(
    initialData?.discountPercentage !== undefined
      ? String(initialData.discountPercentage)
      : "0",
  );
  const [stock, setStock] = useState(
    initialData?.stock !== undefined ? String(initialData.stock) : "",
  );
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );

  const [validationError, setValidationError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setValidationError(null);

    const cleanTitle = title.trim();
    const cleanCategory = category.trim();
    const cleanDescription = description.trim();
    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericDiscount = Number(discountPercentage || 0);

    // Validasi input sebelum dikirim ke mutasi
    if (!cleanTitle) {
      setValidationError("Nama Produk Wajib diisi");
      return;
    }

    if (!cleanCategory) {
      setValidationError("Kategori wajib diisi");
      return;
    }

    if (!cleanDescription) {
      setValidationError("Deskripsi wajib diisi");
      return;
    }

    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setValidationError("Harga harus berapa angka lebih dari 0.");
      return;
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      setValidationError("stok harus berupa bilangan bulat minimal 0.");
      return;
    }

    if (
      Number.isNaN(numericDiscount) ||
      numericDiscount < 0 ||
      numericDiscount > 100
    ) {
      setValidationError("Diskon harus berada di antara 0 hingga 100%.");
      return;
    }

    onSubmit({
      title: cleanTitle,
      brand: brand.trim() || undefined,
      category: cleanCategory,
      price: numericPrice,
      discountPercentage: numericDiscount,
      stock: numericStock,
      thumbnail: thumbnail.trim() || undefined,
      description: cleanDescription,
    });
  }
  return <form onSubmit={handleSubmit} className="space-y-4"></form>;
}
