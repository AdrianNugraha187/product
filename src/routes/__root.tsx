import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ErrorPage from "../pages/error/ErrorPage";
import PageNotFound from "../pages/error/PageNotFound";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorPage,
  notFoundComponent: PageNotFound,
});

function RootComponent() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
