import { createFileRoute, notFound } from "@tanstack/react-router";
import ProductDetailPage from "../../pages/ProductDetailPage";

export const Route = createFileRoute("/products/$productId")({
  parseParams: (params) => {
    const id = Number(params.productId);
    if (!Number.isInteger(id) || id <= 0) {
      throw notFound();
    }

    return { productId: id };
  },
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  return <ProductDetailPage productId={productId} />;
}
