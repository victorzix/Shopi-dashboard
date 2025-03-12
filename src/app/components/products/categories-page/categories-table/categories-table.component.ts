import { provideIcons } from '@ng-icons/core';
import { Component, Input } from '@angular/core';
import {
  BrnContextMenuTriggerDirective,
} from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';
import { ICategory } from '../../../../interfaces/products/categories/category.interface';
import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { lucidePenLine } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { CategoryUpdateFormComponent } from "../category-update-form/category-update-form.component";
import { HlmDialogComponent } from '@spartan-ng/ui-dialog-helm';

@Component({
  selector: 'app-categories-table',
  imports: [
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    // NgIcon,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    BrnContextMenuTriggerDirective,
    CommonModule,
    HlmSkeletonComponent,
    CategoryUpdateFormComponent,
    HlmDialogComponent,
],
  viewProviders: [provideIcons({ lucidePenLine })],
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
})
export class CategoriesTableComponent {
  @Input() public categories: ICategory[] = [];
  @Input() public isLoading = true;
  public clickedCategory: ICategory | null =  null;

  trackById(index: number, category: any): number {
    return category.id;
  }

  handleRightClick(category: ICategory): void {
    this.clickedCategory = category;
  }
}
