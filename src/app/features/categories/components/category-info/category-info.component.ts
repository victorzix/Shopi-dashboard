import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CategoryService } from '../../services/category.service';
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
import { NgIcon } from '@ng-icons/core';
import { SubcategoriesListComponent } from "./subcategories/subcategories-list/subcategories-list.component";
import { HlmSpinnerComponent } from '@shared/libs/ui/ui-spinner-helm/src';
import { Category } from '@core/models/categories/category.model';
import { UpdateCategory } from '../../models/update-category.model';

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
    HlmInputModule,
    FormsModule,
    HlmSpinnerComponent,
    NgIcon,
    SubcategoriesListComponent
],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss',
})
export class CategoryInfoComponent {
  @Output() categoryUpdated = new EventEmitter<Category>();
  @Input() isDialogClosed = false;
  @Input() category: Category = {
    id: '',
    name: '',
    description: '',
    visible: false,
  };

  isUpdateLoading = false;
  originalName: string = this.category.name || '';
  originalDescription: string = this.category.description || '';
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

  async updateCategory(dto: UpdateCategory) {
    this.isUpdateLoading = true;
    await this.categoryService.updateCategory(this.category.id, dto);
    this.isUpdateLoading = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['category'])
    if (changes['category']?.currentValue) {
      this.category = { ...changes['category'].currentValue };
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
