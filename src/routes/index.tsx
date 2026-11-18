import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";

interface ProductSearchParams {
  q?: string;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): ProductSearchParams => ({
    q: (search.q as string) || undefined,
  }),
  component: IndexComponent,
});

function IndexComponent() {
  const { q } = Route.useSearch();
  return <HomePage query={q} />;
}
