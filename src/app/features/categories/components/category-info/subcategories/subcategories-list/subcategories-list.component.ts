import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { CategoryService } from '../../../../../../features/categories/services/category.service';
import { CreateSubcategoryFormComponent } from '../create-subcategory-form/create-subcategory-form.component';
import { Category } from '@core/models/categories/category.model';
import { firstValueFrom, Observable } from 'rxjs';
import { CategoryStore } from 'src/app/features/categories/store/category.store';
import {
  BrnPopoverContentDirective,
  BrnPopoverModule,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmInputModule } from '@shared/libs/ui/ui-input-helm/src';
import { HlmLabelModule } from '@shared/libs/ui/ui-label-helm/src';
import { HlmSelectImports } from '@shared/libs/ui/ui-select-helm/src';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmSpinnerComponent } from '../../../../../../shared/libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { UpdateCategory } from 'src/app/features/categories/models/update-category.model';

@Component({
  selector: 'app-subcategories-list',
  imports: [
    BrnMenuTriggerDirective,
    HlmSkeletonComponent,
    HlmBadgeDirective,
    CommonModule,
    ReactiveFormsModule,
    CreateSubcategoryFormComponent,
    BrnPopoverContentDirective,
    BrnPopoverModule,
    BrnPopoverTriggerDirective,
    HlmInputModule,
    HlmLabelModule,
    HlmSelectImports,
    BrnSelectImports,
    HlmSpinnerComponent,
  ],
  templateUrl: './subcategories-list.component.html',
  styleUrl: './subcategories-list.component.scss',
})
export class SubcategoriesListComponent {
  isSubCategoriesLoading: boolean = false;
  subCategories: Category[] = [];
  selectedCategory$: Observable<Category | null>;
  isVisibilityLoading: boolean = false;
  isUpdateLoading = false;
  isDeleting = false;

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

  isFormPristine(subCategory: Category): boolean {
    const original = this.originalSubCategories[subCategory.id];
    if (!original) return true;

    return (
      this.updateSubCategoryForm.value.name === original.name &&
      this.updateSubCategoryForm.value.description === original.description
    );
  }

  updateSubCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

  ngOnInit() {
    this.loadSubCategories();
  }

  async changeSubCategoryVisibility(subCategory: Category) {
    this.isVisibilityLoading = true;
    await this.categoryService.changeCategoryVisibility(subCategory.id);
    subCategory.visible = !subCategory.visible;
    this.isVisibilityLoading = false;
  }

  async updateSubCategory(subCategory: Category) {
    const formData: UpdateCategory = {
      name: this.updateSubCategoryForm.value.name || '',
      description: this.updateSubCategoryForm.value.description || undefined,
    };

    this.isUpdateLoading = true;
    await this.categoryService.updateCategory(subCategory.id, formData);
    this.isUpdateLoading = false;
  }

  async deleteSubCategory(subCategory: Category) {
    if (this.isDeleteButtonPressed) {
      this.isDeleting = true;
      await this.categoryService.deleteCategory(subCategory.id);
      const index = this.subCategories.findIndex(
        (cat) => cat.id === subCategory.id
      );
      this.subCategories.splice(index, 1);
      this.isDeleteButtonPressed = false;
      this.isDeleting = false;
      return;
    }
    this.isDeleteButtonPressed = true;
  }
}
