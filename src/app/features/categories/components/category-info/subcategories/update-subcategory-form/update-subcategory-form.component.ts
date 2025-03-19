import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { UpdateCategory } from 'src/app/features/categories/models/update-category.model';
import { CategoryService } from 'src/app/features/categories/services/category.service';
import { CategoryStore } from 'src/app/features/categories/store/category.store';

@Component({
  selector: 'app-update-subcategory-form',
  imports: [
    HlmSpinnerComponent,
    BrnPopoverContentDirective,
    CommonModule,
    FormsModule,
    HlmInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-subcategory-form.component.html',
  styleUrl: './update-subcategory-form.component.scss',
})
export class UpdateSubcategoryFormComponent {
  isVisibilityLoading: boolean = false;
  isUpdateLoading: boolean = false;
  isDeleting: boolean = false;
  originalCategoryData: Category;
  isDeleteButtonPressed: boolean = false;
  @Input() subCategory: Category;
  @Output() subCategoryDeleted: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private readonly categoryService: CategoryService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['subCategory']?.currentValue) {
      this.originalCategoryData = { ...changes['subCategory'].currentValue };
      this.updateSubCategoryForm.patchValue({
        name: this.originalCategoryData.name,
        description: this.originalCategoryData.description,
      });
    }
  }

  isFormPristine(): boolean {
    return (
      this.updateSubCategoryForm.value.name ===
        this.originalCategoryData.name &&
      this.updateSubCategoryForm.value.description ===
        this.originalCategoryData.description
    );
  }

  updateSubCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

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
      this.isDeleteButtonPressed = false;
      this.isDeleting = false;
      this.subCategoryDeleted.emit(subCategory);
      return;
    }
    this.isDeleteButtonPressed = true;
  }
}
