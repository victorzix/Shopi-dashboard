import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogModule,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective, HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { CategoryService } from '../../../../services/api/category/category.service';
import { ICreateCategory } from '../../../../interfaces/products/categories/create-category.interface';
import { ICategory } from '../../../../interfaces/products/categories/category.interface';

@Component({
  selector: 'app-create-category-float-button',
  imports: [
    HlmDialogModule,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-category-float-button.component.html',
  styleUrl: './create-category-float-button.component.scss',
})
export class CreateCategoryFloatButtonComponent {
  @Output() categoryCreated = new EventEmitter<ICategory>();

  constructor(private readonly categoryService: CategoryService) {}

  createCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(null),
  });

  async createCategory(dialog: HlmDialogComponent) {
    const formData: ICreateCategory = {
      name: this.createCategoryForm.value.name || '',
      description: this.createCategoryForm.value.description || 'Sem descrição',
    };
    const category = await this.categoryService.createCategory(formData);
    if (category) {
      dialog.close(true);
      this.createCategoryForm.reset();
      this.categoryCreated.emit(category);
    }
  }
}
