import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrnContextMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  hlmMenuItemVariants,
} from '@spartan-ng/ui-menu-helm';
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
import { CategoryService } from '../../../../features/categories/services/category.service';
import { CategoryInfoComponent } from '../category-info/category-info.component';
import { BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import { Category } from '@core/models/categories/category.model';
import { CategoryStore } from '../../store/category.store';

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
  providers: [CategoryStore],
  viewProviders: [provideIcons({ lucideChevronDown })],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
})
export class CategoriesTableComponent {
  @Input() public categories: Category[] = [];
  @Input() public isLoading = true;
  @Output() categoryDeleted = new EventEmitter<void>();
  dialogClosed = true;
  protected readonly _hlmMenuItemClasses = hlmMenuItemVariants({ inset: true });
  public expandedCategoryId: string | null = null;

  constructor(
    private categoryService: CategoryService,
    private categoryStore: CategoryStore
  ) {}

  trackById(index: number, category: any): number {
    return category.id;
  }

  handleRightClick(category: Category): void {
    this.categoryStore.setSelectedCategory(category);
  }

  openDialog(): void {
    this.dialogClosed = false;
  }

  closeDialog() {
    this.dialogClosed = true;
  }

  toggleExpand(categoryId: string): void {
    this.expandedCategoryId =
      this.expandedCategoryId === categoryId ? null : categoryId;
  }

  updateCategoryInList(updatedCategory: Category) {
    const index = this.categories.findIndex((c) => c.id === updatedCategory.id);
    if (index !== -1) {
      this.categories[index] = { ...updatedCategory };
    }
  }

  async deleteCategory() {
    const selectedCategory = await this.categoryStore.selectedCategory$.toPromise();

    if (selectedCategory) {
      await this.categoryService.deleteCategory(selectedCategory.id);
      const index = this.categories.findIndex(
        (category) => selectedCategory.id === category.id
      );

      if (index !== -1) {
        this.categories.splice(index, 1);
        this.categoryDeleted.emit();
      }
    }
  }
}
