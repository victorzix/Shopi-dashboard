import { ICategory } from "./category.interface";

export interface IListCategoryResponse {
  categories: ICategory[],
  total: number;
}
