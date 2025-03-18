import { Category } from "@core/models/categories/category.model";

export interface ListCategoryResponse {
  categories: Category[],
  total: number;
}
