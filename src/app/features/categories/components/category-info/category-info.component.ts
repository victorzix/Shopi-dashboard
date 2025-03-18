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
import { SubcategoriesListComponent } from './subcategories/subcategories-list/subcategories-list.component';
import { HlmSpinnerComponent } from '@shared/libs/ui/ui-spinner-helm/src';
import { Category } from '@core/models/categories/category.model';
import { UpdateCategory } from '../../models/update-category.model';
import { CategoryStore } from '../../store/category.store';
import { firstValueFrom, Observable, Subscription } from 'rxjs';

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
    SubcategoriesListComponent,
  ],
  templateUrl: './category-info.component.html',
  styleUrl: './category-info.component.scss',
})
export class CategoryInfoComponent {
  @Output() categoryUpdated = new EventEmitter<Category>();
  @Input() isDialogClosed = false;

  isUpdateLoading = false;
  originalName: string = '';
  originalDescription: string = '';
  isEditingTitle: boolean = false;
  isEditingDescription: boolean = false;
  private subscription: Subscription = new Subscription();
  selectedCategory$: Observable<Category | null>;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryStore: CategoryStore
  ) {
    this.selectedCategory$ = this.categoryStore.selectedCategory$;
  }

  ngOnInit() {
    this.selectedCategory$ = this.categoryStore.selectedCategory$;
    this.subscription.add(
      this.selectedCategory$.subscribe((category) => {
        if (category) {
          this.originalName = category.name;
          this.originalDescription = category.description || '';
          this.updateCategoryForm.setValue({
            name: category.name,
            description: category.description || '',
          });
        }
      })
    );
    this.setupValueChangeListeners();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateCategoryForm = new FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
  }>({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

  async updateCategory(dto: UpdateCategory) {
    const category = await firstValueFrom(this.selectedCategory$);
    if (category) {
      this.isUpdateLoading = true;
      await this.categoryService.updateCategory(category.id, dto);
      this.categoryStore.setSelectedCategory({ ...category, ...dto });
      this.isUpdateLoading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']?.currentValue) {
      this.categoryStore.setSelectedCategory(changes['category'].currentValue);
    }

    if (changes['isDialogClosed']?.currentValue) {
      this.cancelTitleEdit();
      this.cancelDescriptionEdit();
    }
  }

  async editTitle() {
    const category = await firstValueFrom(this.selectedCategory$);
    if (category) {
      this.originalName = category.name;
      this.isEditingTitle = true;
    }
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

    const category = await firstValueFrom(this.selectedCategory$);
    if (category) {
      await this.updateCategory({ name: category.name });
      category.name = this.updateCategoryForm.value.name || this.originalName;
      this.originalName = category.name;
      this.updateCategoryForm.controls.name.markAsPristine();

      this.categoryUpdated.emit(category);
    }
    this.isEditingTitle = false;
  }

  async cancelTitleEdit() {
    const category = await firstValueFrom(this.selectedCategory$);
    if (category) {
      category.name = this.originalName;
      this.updateCategoryForm.controls.name.markAsPristine();
    }

    this.isEditingTitle = false;
  }

  async editDescription() {
    const category = await firstValueFrom(this.selectedCategory$);
    if (category?.description) {
      this.originalDescription = category.description;
      this.isEditingDescription = true;
    }
  }

  async confirmDescriptionEdit() {
    const category = await firstValueFrom(this.selectedCategory$);
    if (category) {
      if (!this.updateCategoryForm.value.description) {
        category.description = 'Sem descrição';
      } else {
        await this.updateCategory({ description: category.description });
        category.description =
          this.updateCategoryForm.value.description || this.originalName;
      }
      this.updateCategoryForm.controls.description.markAsPristine();
      this.categoryUpdated.emit(category);
    }
    this.isEditingDescription = false;
  }

  async cancelDescriptionEdit() {
    const category = await firstValueFrom(this.selectedCategory$);
    if (category) {
      category.description = this.originalDescription;
      this.isEditingDescription = false;
      this.updateCategoryForm.controls.description.markAsPristine();
    }
  }
}
