import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '@core/models/categories/category.model';
import { HlmInputModule } from '@shared/libs/ui/ui-input-helm/src';
import { HlmSpinnerComponent } from '@shared/libs/ui/ui-spinner-helm/src';
import { BrnPopoverContentDirective } from '@spartan-ng/brain/popover';
import { Observable } from 'rxjs';
import { CreateCategory } from 'src/app/features/categories/models/create-category.model';
import { CategoryService } from 'src/app/features/categories/services/category.service';
import { CategoryStore } from 'src/app/features/categories/store/category.store';

@Component({
  selector: 'app-create-subcategory-form',
  imports: [
    HlmSpinnerComponent,
    BrnPopoverContentDirective,
    CommonModule,
    FormsModule,
    HlmInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-subcategory-form.component.html',
})
export class CreateSubcategoryFormComponent {
  isVisibilityLoading: boolean = false;
  isCreateLoading: boolean = false;
  selectedCategory$: Observable<Category | null>;
  @Output() subCategoryCreated: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(
    private readonly categoryService: CategoryService,
    readonly categoryStore: CategoryStore
  ) {
    this.selectedCategory$ = this.categoryStore.selectedCategory$;
  }

  createSubCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    parentId: FormControl<string | null>;
  }>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    parentId: new FormControl(null, [Validators.required]),
  });

  async createSubCategory() {
    this.selectedCategory$.subscribe((data) =>
      this.createSubCategoryForm.patchValue({ parentId: data?.id })
    );

    const formData: CreateCategory = {
      name: this.createSubCategoryForm.value.name || '',
      description: this.createSubCategoryForm.value.description || undefined,
      parentId: this.createSubCategoryForm.value.parentId || undefined,
    };

    this.isCreateLoading = true;
    const subCategory = await this.categoryService.createCategory(formData);
    if (subCategory) {
      this.createSubCategoryForm.reset()
      this.subCategoryCreated.emit(subCategory);
    }
    this.isCreateLoading = false;
  }
}
