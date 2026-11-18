import { useNavigate, useSearch } from "@tanstack/react-router";
import React, { useState } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });
  const currencyQuery = searchParams.q ?? "";

  const [inputSearch, setInputSearch] = useState(currencyQuery);
  const [prevQuery, setPrevQuery] = useState(currencyQuery);

  if (currencyQuery !== prevQuery) {
    setPrevQuery(currencyQuery);
    setInputSearch(currencyQuery);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cleanSearch = inputSearch.trim();

    navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        q: cleanSearch || undefined,
      }),
    });
  }

  function handleClear() {
    setInputSearch("");

    navigate({
      to: "/",
      search: (prev) => ({
        ...prev,
        q: undefined,
      }),
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          aria-label="Cari produk"
          value={inputSearch}
          onChange={(event) => setInputSearch(event.target.value)}
          placeholder="Cari Produk..."
        />
        {inputSearch && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Hapus pencarian"
          >
            X
          </button>
        )}
        <button type="submit">Cari</button>
      </form>
    </div>
  );
}
