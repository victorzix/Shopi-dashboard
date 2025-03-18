import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { HlmSkeletonComponent } from '@spartan-ng/ui-skeleton-helm';
import { CategoryService } from '../../../../../../features/categories/services/category.service';
import { CreateSubcategoryFormComponent } from '../create-subcategory-form/create-subcategory-form.component';
import { Category } from '@core/models/categories/category.model';

@Component({
  selector: 'app-subcategories-list',
  imports: [
    BrnMenuTriggerDirective,
    HlmSkeletonComponent,
    HlmBadgeDirective,
    CommonModule,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    CreateSubcategoryFormComponent,
  ],
  templateUrl: './subcategories-list.component.html',
  styleUrl: './subcategories-list.component.scss',
})
export class SubcategoriesListComponent {
  isSubCategoriesLoading: boolean = false;
  subCategories: Category[] = [];
  @Input() category: Category = {id: '', name: '', visible: true};

  constructor(private readonly categoryService: CategoryService) {}

  async loadSubCategories() {
    this.subCategories = [];
    this.isSubCategoriesLoading = true;
    const response = await this.categoryService.listCategories({
      limit: 100,
      parentId: this.category.id,
    });
    this.subCategories = response?.categories ?? [];
    this.isSubCategoriesLoading = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']?.currentValue) {
      this.loadSubCategories();
    }
  }
}
