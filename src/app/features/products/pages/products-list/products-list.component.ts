import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { HlmLabelModule } from '@shared/libs/ui/ui-label-helm/src';
import { HlmSelectImports } from '@shared/libs/ui/ui-select-helm/src';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonModule } from '@shared/libs/ui/ui-button-helm/src';
import { HlmInputModule } from '@shared/libs/ui/ui-input-helm/src';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-products-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIcon,
    HlmLabelModule,
    HlmButtonModule,
    HlmInputModule,
    BrnSelectImports,
    ProductComponent,
    HlmSelectImports,
  ],
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  public isLoading = true;

  filterform = new FormGroup<{
    name: FormControl<string | null>;
    parentId: FormControl<string | null>;
    visible: FormControl<boolean>;
  }>({
    name: new FormControl(null),
    parentId: new FormControl(null),
    visible: new FormControl(true, { nonNullable: true }),
  });

  async ngOnInit() {
    // await this.loadCategories();
  }

  async filterCategories() {}
}
