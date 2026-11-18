import { createFileRoute } from "@tanstack/react-router";
import PageNotFound from "../pages/error/PageNotFound";

export const Route = createFileRoute("/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageNotFound />;
}
