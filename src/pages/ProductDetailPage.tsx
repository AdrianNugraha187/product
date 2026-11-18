import { useProductDetail } from "../hooks/useProductDetail";

interface ProductDetailPageProps {
  productId: number;
}

export default function ProductDetailPage({
  productId,
}: ProductDetailPageProps) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(productId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!product) {
    return <p>Produk tidak ditemukan.</p>;
  }

  return (
    <div>
      <img src={product.thumbnail} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
