import { Component } from '@angular/core';
import { CategoriesTableComponent } from '../../../components/products/categories-page/categories-table/categories-table.component';
import { CategoryService } from '../../../services/api/category/category.service';
import { ICategory } from '../../../interfaces/products/categories/category.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFilterCategory } from '../../../interfaces/products/categories/filter-category.interface';
import { filterUndefined } from '../../../common/objectCommons';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelModule } from '@spartan-ng/ui-label-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import {
  lucideChevronFirst,
  lucideChevronLast,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsLeft,
  lucideChevronsRight,
  lucideSearch,
} from '@ng-icons/lucide';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { CreateCategoryFloatButtonComponent } from '../../../components/products/categories-page/create-category-float-button/create-category-float-button.component';

@Component({
  selector: 'app-categories-page',
  imports: [
    CategoriesTableComponent,
    ReactiveFormsModule,
    HlmInputModule,
    HlmLabelModule,
    BrnSelectImports,
    HlmSelectImports,
    HlmButtonModule,
    NgIcon,
    CommonModule,
    CreateCategoryFloatButtonComponent,
  ],
  viewProviders: [
    provideIcons({
      lucideSearch,
      lucideChevronRight,
      lucideChevronLeft,
      lucideChevronsRight,
      lucideChevronsLeft,
      lucideChevronFirst,
      lucideChevronLast,
    }),
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss',
})
export class CategoriesPageComponent {
  private currentFilters: IFilterCategory = {};
  public categories: ICategory[] = [];
  public isLoading = true;
  public limit = 6;
  public itemPerPage = 5;
  public page = 1;
  public totalPages = 0;

  constructor(private readonly categoryService: CategoryService) {}

  filterform = new FormGroup<{
    name: FormControl<string | null>;
    parentId: FormControl<string | null>;
    visible: FormControl<boolean>;
  }>({
    name: new FormControl(null),
    parentId: new FormControl(null),
    visible: new FormControl(true, { nonNullable: true }),
  });

  async ngOnInit() {
    await this.loadCategories();
  }

  async filterCategories() {
    const formData: IFilterCategory = {
      name: this.filterform.value.name || undefined,
      parentId: this.filterform.value.parentId || undefined,
      visible: this.filterform.value.visible ?? true,
      limit: this.limit,
      offset: this.page - 1,
    };

    this.currentFilters = filterUndefined(formData);
    await this.loadCategories(this.currentFilters);
  }

  async loadCategories(filters?: IFilterCategory) {
    this.isLoading = true;

    const paginationDefaults = {
      limit: this.limit,
      offset: 0,
      nameOrder: 'asc',
    };

    const data = await this.categoryService.listCategories(
      filters ? filters : paginationDefaults
    );

    if (data) {
      this.totalPages = Math.ceil(data.total / this.itemPerPage);
    }
    console.log(this.totalPages)
    this.categories = data?.categories ?? [];
    this.isLoading = false;
  }

  addNewCategoryToList(category: ICategory) {
    this.categories = [category, ...this.categories];
  }

  async changePage(page: number) {
    this.page = page;

    if(page >= this.totalPages) this.page = this.totalPages;
    if(page <= 1) this.page = 1;

    await this.loadCategories({
      ...this.currentFilters,
      offset: (this.page - 1) * this.itemPerPage,
      limit: this.limit,
      nameOrder: 'asc',
    });
  }

  async nextPage() {
    this.page++;
    await this.changePage(this.page);
  }

  async prevPage() {
    if (this.page > 1) {
      this.page--;
      await this.changePage(this.page);
    }
  }

  getPagesToDisplay(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;

    if (total <= 1) return [1];

    let start = Math.max(1, this.page - 2);
    let end = Math.min(total, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      pages.push(-1);
    }

    return pages;
  }
}
