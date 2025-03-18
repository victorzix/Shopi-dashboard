import { Component, Input } from '@angular/core';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogModule,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../features/categories/services/category.service';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import { hlmMenuItemVariants } from '@spartan-ng/ui-menu-helm';
import { Category } from '@core/models/categories/category.model';
import { UpdateCategory } from '../../models/update-category.model';

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
  @Input() public category: Category | null = null;
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({ inset: true });

  constructor(private readonly categoryService: CategoryService) {}

  updateCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null),
    description: new FormControl(null),
  });

  async updateCategory() {
    const formData: UpdateCategory = {
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
