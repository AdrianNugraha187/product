import type {
  Product,
  ProductCardData,
  ProductResponse,
} from "../types/product.types";

export interface PaginatedProductCards {
  products: ProductCardData[];
  total: number;
  skip: number;
  limit: number;
}

interface GetProductsParams {
  limit?: number;
  skip?: number;
  signal?: AbortSignal;
}

interface SearchProductsParams extends GetProductsParams {
  query: string;
}

const BASE_URL = "https://dummyjson.com/products";

function toProductCard(item: Product): ProductCardData {
  return {
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail,
    price: item.price,
    discountPercentage: item.discountPercentage,
    rating: item.rating,
    category: item.category,
    brand: item.brand,
    availabilityStatus: item.availabilityStatus,
  };
}

async function fetchProductList(
  url: string,
  signal?: AbortSignal,
): Promise<PaginatedProductCards> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status}: ${res.statusText || "Failed to fetch products"}`,
    );
  }

  const data: ProductResponse = await res.json();

  return {
    products: data.products.map(toProductCard),
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  };
}

export function getProducts({
  limit = 16,
  skip = 0,
  signal,
}: GetProductsParams = {}): Promise<PaginatedProductCards> {
  return fetchProductList(`${BASE_URL}?limit=${limit}&skip=${skip}`, signal);
}

export function searchProducts({
  query,
  limit = 16,
  skip = 0,
  signal,
}: SearchProductsParams): Promise<PaginatedProductCards> {
  const cleanQuery = encodeURIComponent(query.trim());
  return fetchProductList(
    `${BASE_URL}/search?q=${cleanQuery}&limit=${limit}&skip=${skip}`,
    signal,
  );
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status}: ${res.statusText || "Failed to fetch data"}`,
    );
  }

  return res.json() as Promise<T>;
}

export async function getProductById(
  id: string | number,
  signal?: AbortSignal,
): Promise<Product> {
  return fetchJson(`${BASE_URL}/${id}`, signal);
}

// export async function addProduct(signal?: AbortSignal) {
//   const res = await fetch(`${BASE_URL}/add`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       title: "",
//     }),
//     signal,
//   });

//   if (!res.ok) {
//     throw new Error(
//       `HTTP ${res.status}: ${res.statusText || "Failed to fetch data"}`,
//     );
//   }

//   return res.json();
// }

// export async function updateProduct(id: string | number, signal?: AbortSignal) {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       title: "",
//     }),
//     signal,
//   });

//   if (!res.ok) {
//     throw new Error(
//       `HTTP ${res.status}: ${res.statusText || "Failed to fetch data"}`,
//     );
//   }

//   return res.json();
// }

// export async function deleteProduct(id: string | number, signal?: AbortSignal) {
//   const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE", signal });

//   if (!res.ok) {
//     throw new Error(
//       `HTTP ${res.status}: ${res.statusText || "Failed to fetch data"}`,
//     );
//   }

//   return res.json();
// }
