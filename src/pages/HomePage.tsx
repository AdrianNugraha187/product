import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/ProductList";

interface QueryProps {
  query?: string;
}

export default function HomePage({ query }: QueryProps) {
  const { data, isError, isLoading, error } = useProducts(query);
  return (
    <div>
      {isError && <p>Error: {error.message}</p>}

      {isLoading && <h2>Loading...</h2>}

      {data && !isError && <ProductList data={data.products} />}
    </div>
  );
}
