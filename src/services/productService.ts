import type {
  CreateProductPayload,
  DeletedProduct,
  Product,
  ProductCardData,
  ProductResponse,
  UpdateProductPayload,
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

async function fetchJson<T>(
  url: string,
  options?: RequestInit,
  signal?: AbortSignal,
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    signal,
  });

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
  return fetchJson(`${BASE_URL}/${id}`, undefined, signal);
}

export function addProduct(
  payload: CreateProductPayload,
  signal?: AbortSignal,
) {
  return fetchJson<Product>(`${BASE_URL}/add`, {
    method: "POST",
    body: JSON.stringify(payload),
    signal,
  });
}

const DUMMYJSON_MAX_ID = 194;

export function updateProduct(
  id: string | number,
  payload: UpdateProductPayload,
  signal?: AbortSignal,
) {
  if (Number(id) > DUMMYJSON_MAX_ID) {
    return {
      id: Number(id),
      ...payload,
    } as Product;
  }
  return fetchJson<Product>(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    signal,
  });
}

export function deleteProduct(id: string | number, signal?: AbortSignal) {
  if (Number(id) > DUMMYJSON_MAX_ID) {
    return {
      id: Number(id),
      isDeleted: true,
      deletedOn: new Date().toISOString(),
    } as DeletedProduct;
  }
  return fetchJson(`${BASE_URL}/${id}`, {
    method: "DELETE",
    signal,
  });
}
