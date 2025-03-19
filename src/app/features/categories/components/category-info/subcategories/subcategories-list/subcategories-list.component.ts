import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { CategoryService } from '../../../../../../features/categories/services/category.service';
import { CreateSubcategoryFormComponent } from '../create-subcategory-form/create-subcategory-form.component';
import { Category } from '@core/models/categories/category.model';
import { firstValueFrom, Observable } from 'rxjs';
import { CategoryStore } from 'src/app/features/categories/store/category.store';
import {
  BrnPopoverModule,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmInputModule } from '@shared/libs/ui/ui-input-helm/src';
import { HlmLabelModule } from '@shared/libs/ui/ui-label-helm/src';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateSubcategoryFormComponent } from '../update-subcategory-form/update-subcategory-form.component';

@Component({
  selector: 'app-subcategories-list',
  imports: [
    HlmSkeletonComponent,
    HlmBadgeDirective,
    CommonModule,
    ReactiveFormsModule,
    CreateSubcategoryFormComponent,
    BrnPopoverModule,
    BrnPopoverTriggerDirective,
    HlmInputModule,
    HlmLabelModule,
    UpdateSubcategoryFormComponent,
  ],
  templateUrl: './subcategories-list.component.html',
  styleUrl: './subcategories-list.component.scss',
})
export class SubcategoriesListComponent {
  isSubCategoriesLoading: boolean = false;
  subCategories: Category[] = [];
  selectedCategory$: Observable<Category | null>;
  selectedSubCategory: Category;

  isDeleteButtonPressed: boolean = false;

  originalSubCategories: Record<
    string,
    { name: string; description: string | null }
  > = {};

  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryStore: CategoryStore
  ) {
    this.selectedCategory$ = this.categoryStore.selectedCategory$;
  }

  async loadSubCategories() {
    const parentCategory = await firstValueFrom(this.selectedCategory$);
    if (parentCategory) {
      this.subCategories = [];
      this.isSubCategoriesLoading = true;
      const response = await this.categoryService.listCategories({
        limit: 100,
        parentId: parentCategory?.id,
      });
      this.subCategories = response?.categories ?? [];

      this.subCategories.forEach((sub) => {
        this.originalSubCategories[sub.id] = {
          name: sub.name,
          description: sub.description || '',
        };
      });

      this.isSubCategoriesLoading = false;
    }
  }

  updateSubCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

  trackByFn(index: number, item: Category) {
    return item.id;
  }

  ngOnInit() {
    this.loadSubCategories();
  }

  subCategoryDeleted(subCategory: Category) {
    const index = this.subCategories.findIndex(
      (sub) => sub.id == subCategory.id
    );
    if (index !== -1) {
      this.subCategories.splice(index, 1);
    }
  }

  subCategoryCreated(subCategory: Category) {
    this.subCategories.push(subCategory);
  }
}
