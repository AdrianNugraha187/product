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
}: ProductFormProps) {
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
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(validationError || errorMessage) && (
        <div role="alert" className="text-red-500">
          {validationError || errorMessage}
        </div>
      )}
      <div>
        <label htmlFor="title">Nama Produk *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSubmitting}
          placeholder="Contoh: Mechanical Keyboard Wireless"
        />
      </div>

      <div>
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          disabled={isSubmitting}
          placeholder="Contoh: Keychron"
        />
      </div>

      <div>
        <label htmlFor="category">Kategori</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price">Harga ($) *</label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isSubmitting}
          placeholder="0.00"
        />
      </div>

      <div>
        <label htmlFor="discountPercentage">Diskon (%)</label>
        <input
          id="discountPercentage"
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="stock">Stok *</label>
        <input
          id="stock"
          type="number"
          min="0"
          step="1"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          disabled={isSubmitting}
          placeholder="0"
        />
      </div>

      <div>
        <label htmlFor="thumbnail">URL Gambar Thumbnail</label>
        <input
          id="thumbnail"
          type="url"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          disabled={isSubmitting}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="description">Deskripsi *</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
          placeholder="Jelaskan spesifikasi dan keunggulan produk..."
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : submitLabel}
      </button>
    </form>
  );
}
