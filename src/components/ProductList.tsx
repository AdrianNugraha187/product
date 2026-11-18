// import type { PaginatedProductCards } from "../services/productService";
import type { ProductCardData } from "../types/product.types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  data: ProductCardData[];
}

export default function ProductList({ data }: ProductListProps) {
  return (
    <div>
      {data.length === 0 ? (
        <p>Tidak ada product</p>
      ) : (
        data.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
