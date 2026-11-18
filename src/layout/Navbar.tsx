import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <div>
      <div>
        <Link to="/">Produk</Link>
      </div>

      <div>
        <Navbar />
      </div>

      <div>
        <Link to="/about-us">About Us</Link>
      </div>
    </div>
  );
}
