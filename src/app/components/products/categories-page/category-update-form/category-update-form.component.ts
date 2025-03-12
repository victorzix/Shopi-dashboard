import { Component, Input } from '@angular/core';
import {
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogModule,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { ICategory } from '../../../../interfaces/products/categories/category.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/api/category/category.service';
import { IUpdateCategory } from '../../../../interfaces/products/categories/update-category.interface';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-update-form',
  imports: [
    HlmDialogModule,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    ReactiveFormsModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    CommonModule,
  ],
  templateUrl: './category-update-form.component.html',
  styleUrl: './category-update-form.component.scss',
})
export class CategoryUpdateFormComponent {
  @Input() public category: ICategory | null = null;

  constructor(private readonly categoryService: CategoryService) {}

  updateCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null),
    description: new FormControl(null),
  });

  async updateCategory() {
    const formData: IUpdateCategory = {
      name: this.updateCategoryForm.value.name || undefined,
      description: this.updateCategoryForm.value.description || undefined,
    };

    await this.categoryService.updateCategory(
      this.category?.id || '',
      formData
    );
    this.updateCategoryForm.reset();
  }
}
