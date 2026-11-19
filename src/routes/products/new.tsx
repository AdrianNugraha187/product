import { createFileRoute } from "@tanstack/react-router";
import CreateProductPage from "../../pages/CreateProductPage";

export const Route = createFileRoute("/products/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateProductPage />;
}
