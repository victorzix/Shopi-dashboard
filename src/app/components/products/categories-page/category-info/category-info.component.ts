import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICategory } from '../../../../interfaces/products/categories/category.interface';
import { CategoryService } from '../../../../services/api/category/category.service';
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
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUpdateCategory } from '../../../../interfaces/products/categories/update-category.interface';
import { HlmInputDirective, HlmInputModule } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { CommonModule } from '@angular/common';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  hlmMenuItemVariants,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent,
} from '@spartan-ng/ui-menu-helm';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmSkeletonComponent } from '../../../libs/ui/ui-skeleton-helm/src/lib/hlm-skeleton.component';
import { NgIcon } from '@ng-icons/core';
import { HlmSpinnerComponent } from '../../../libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';

@Component({
  selector: 'app-category-info',
  imports: [
    HlmDialogModule,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    BrnDialogContentDirective,
    ReactiveFormsModule,
    CommonModule,
    HlmBadgeDirective,
    HlmMenuComponent,
    HlmInputModule,
    HlmMenuGroupComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    BrnMenuTriggerDirective,
    HlmSkeletonComponent,
    FormsModule,
    HlmSpinnerComponent,
    NgIcon,
  ],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss',
})
export class CategoryInfoComponent {
  @Output() categoryUpdated = new EventEmitter<ICategory>();
  @Input() isDialogClosed = false;
  @Input() category: ICategory = {
    id: '',
    name: '',
    description: '',
    visible: false,
  };

  subCategories: ICategory[] = [];
  isUpdateLoading = false;
  isSubCategoriesLoading: boolean = false;
  originalName: string = '';
  originalDescription: string = '';
  isEditingTitle: boolean = false;
  isEditingDescription: boolean = false;


  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit() {
    this.setupValueChangeListeners();
  }

  updateCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

  async updateCategory(dto: IUpdateCategory) {
    this.isUpdateLoading = true;
    await this.categoryService.updateCategory(this.category.id, dto);
    this.isUpdateLoading = false;
  }

  async loadSubCategories() {
    this.subCategories = [];
    this.isSubCategoriesLoading = true;
    const response = await this.categoryService.listCategories({
      limit: 100,
      parentId: this.category?.id,
    });
    this.subCategories = response?.categories ?? [];
    this.isSubCategoriesLoading = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']?.currentValue) {
      this.category = { ...changes['category'].currentValue };
      this.loadSubCategories();
    }

    if (changes['isDialogClosed']?.currentValue) {
      this.cancelTitleEdit();
      this.cancelDescriptionEdit();
    }
  }

  editTitle() {
    this.originalName = this.category.name;
    this.isEditingTitle = true;
  }

  setupValueChangeListeners() {
    this.updateCategoryForm.controls.name.valueChanges.subscribe((value) => {
      if (value === this.originalName) {
        this.updateCategoryForm.controls.name.markAsPristine();
      } else {
        this.updateCategoryForm.controls.name.markAsDirty();
      }
    });

    this.updateCategoryForm.controls.description.valueChanges.subscribe(
      (value) => {
        if (value === this.originalDescription) {
          this.updateCategoryForm.controls.description.markAsPristine();
        } else {
          this.updateCategoryForm.controls.description.markAsDirty();
        }
      }
    );
  }

  async confirmTitleEdit() {
    this.updateCategoryForm.controls.name.markAsTouched();
    this.updateCategoryForm.controls.name.updateValueAndValidity();

    if (this.updateCategoryForm.controls.name.invalid) {
      return;
    }

    await this.updateCategory({ name: this.category.name });
    this.category.name =
      this.updateCategoryForm.value.name || this.originalName;
    this.originalName = this.category.name;
    this.updateCategoryForm.controls.name.markAsPristine();

    this.isEditingTitle = false;
    this.categoryUpdated.emit(this.category);
  }

  cancelTitleEdit() {
    this.category.name = this.originalName;
    this.updateCategoryForm.controls.name.markAsPristine();
    this.isEditingTitle = false;
  }

  editDescription() {
    if (this.category?.description) {
      this.originalDescription = this.category.description;
      this.isEditingDescription = true;
    }
  }

  async confirmDescriptionEdit() {
    if (!this.updateCategoryForm.value.description) {
      this.category.description = 'Sem descrição';
    } else {
      await this.updateCategory({ description: this.category.description });
      this.category.description =
      this.updateCategoryForm.value.description || this.originalName;
    }
    this.updateCategoryForm.controls.description.markAsPristine();
    this.isEditingDescription = false;
    this.categoryUpdated.emit(this.category);
  }

  cancelDescriptionEdit() {
    this.category.description = this.originalDescription;
    this.isEditingDescription = false;
    this.updateCategoryForm.controls.description.markAsPristine();
  }
}
