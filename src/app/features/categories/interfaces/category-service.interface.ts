import { Category } from '@core/models/categories/category.model';
import { CreateCategory } from '../models/create-category.model';
import { FilterCategory } from '../models/filter-category.model';
import { ListCategoryResponse } from '../models/list-category-response.model';
import { UpdateCategory } from '../models/update-category.model';

export interface ICategoryService {
  listCategories(filter?: FilterCategory): Promise<ListCategoryResponse | null>;
  createCategory(dto: CreateCategory): Promise<Category | null>;
  changeCategoryVisibility(id: string): Promise<void>;
  updateCategory(id: string, dto: UpdateCategory): Promise<Category | null>;
  deleteCategory(id: string): Promise<void>;
}
