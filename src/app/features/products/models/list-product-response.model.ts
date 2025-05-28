import { Product } from "@core/models/products/product.model";

export interface ListProductResponse {
  products: Product[],
  total: number;
}
