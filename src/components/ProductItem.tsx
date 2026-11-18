import type { ProductCardData } from "../types/product.types";
import { Link } from "@tanstack/react-router";

interface ProductItemProps {
  product: ProductCardData;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Link to="/products/$productId" params={{ productId: product.id }}>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.title}</p>

      <p>{product.price}</p>

      <p>{product.category}</p>
      <p>{product.rating}</p>
    </Link>
  );
}
