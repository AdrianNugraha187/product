export interface Dimension {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  data: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  dimensions: Dimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductCardData = Pick<
  Product,
  | "id"
  | "title"
  | "thumbnail"
  | "price"
  | "discountPercentage"
  | "rating"
  | "category"
  | "brand"
  | "availabilityStatus"
>;

export interface CreateProductPayload {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail?: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface DeletedProduct extends Product {
  isDeleted: boolean;
  deletedOn: string;
}
