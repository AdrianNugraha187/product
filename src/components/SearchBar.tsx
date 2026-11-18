import { useNavigate, useSearch } from "@tanstack/react-router";
import React, { useState } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as { q?: string };
  const [inputSearch, setInputSearch] = useState(searchParams.q || "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cleanSearch = inputSearch.trim();

    navigate({
      to: "/",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        q: cleanSearch || undefined,
      }),
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product"
          value={inputSearch}
          onChange={(event) => setInputSearch(event.target.value)}
          placeholder="Cari Produk"
        />
        <button type="submit">Cari</button>
      </form>
    </div>
  );
}
