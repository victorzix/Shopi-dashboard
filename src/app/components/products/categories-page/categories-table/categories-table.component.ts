import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrnContextMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  hlmMenuItemVariants,
} from '@spartan-ng/ui-menu-helm';
import { ICategory } from '../../../../interfaces/products/categories/category.interface';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { lucideChevronDown, lucidePenLine } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { CategoryUpdateFormComponent } from '../category-update-form/category-update-form.component';
import { HlmDialogComponent } from '@spartan-ng/ui-dialog-helm';
import { CategoryService } from '../../../../services/api/category/category.service';
import { CategoryInfoComponent } from '../category-info/category-info.component';
import { BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-categories-table',
  imports: [
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    BrnDialogTriggerDirective,
    BrnContextMenuTriggerDirective,
    CommonModule,
    HlmSkeletonComponent,
    CategoryUpdateFormComponent,
    HlmDialogComponent,
    CategoryInfoComponent,
  ],
  viewProviders: [provideIcons({ lucideChevronDown })],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
})
export class CategoriesTableComponent {
  @Input() public categories: ICategory[] = [];
  @Input() public isLoading = true;
  @Output() categoryDeleted = new EventEmitter<void>();
  dialogClosed = true;
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({ inset: true });
  public contextCategory: ICategory = { id: '', name: '', visible: false };
  public clickedCategory: ICategory = { id: '', name: '', visible: false };
  public expandedCategoryId: string | null = null;

  constructor(private categoryService: CategoryService) {}

  trackById(index: number, category: any): number {
    return category.id;
  }

  handleRightClick(category: ICategory): void {
    this.contextCategory = category;
  }

  openDialog(): void {
    this.dialogClosed = false;
    this.clickedCategory = this.contextCategory;
  }

  closeDialog() {
    this.dialogClosed = true;
  }

  toggleExpand(categoryId: string): void {
    this.expandedCategoryId =
      this.expandedCategoryId === categoryId ? null : categoryId;
  }

  updateCategoryInList(updatedCategory: ICategory) {
    const index = this.categories.findIndex((c) => c.id === updatedCategory.id);
    if (index !== -1) {
      this.categories[index] = { ...updatedCategory };
    }
  }

  async deleteCategory() {
    if (this.clickedCategory) {
      await this.categoryService.deleteCategory(this.clickedCategory.id);
      const index = this.categories.findIndex(
        (category) => this.clickedCategory?.id === category.id
      );

      if (index !== -1) {
        this.categories.splice(index, 1);
        this.categoryDeleted.emit();
      }
    }
  }
}
