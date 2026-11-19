import { Link } from "@tanstack/react-router";
import SearchBar from "../components/SearchBar";

export default function Navbar() {
  return (
    <div>
      <div>
        <Link to="/">Produk</Link>
      </div>

      <div>
        <SearchBar />
      </div>

      <div>
        <Link to="/about-us">About Us</Link>
      </div>
      <div>
        <Link to="/products/new">+ Tambah Produk</Link>
      </div>
    </div>
  );
}
