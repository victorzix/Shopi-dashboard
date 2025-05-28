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
import { ProductService } from '../../services/product.service';
import { Product } from '@core/models/products/product.model';
import { HlmSkeletonModule } from '../../../../shared/libs/ui/ui-skeleton-helm/src/index';
import { HlmSkeletonComponent } from '../../../../shared/libs/ui/ui-skeleton-helm/src/lib/hlm-skeleton.component';

@Component({
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
    HlmSkeletonModule,
    HlmSkeletonComponent,
  ],
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  public products: Product[] = [];
  public isLoading = false;

  constructor(private readonly productService: ProductService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  filterform = new FormGroup<{
    name: FormControl<string | null>;
    parentId: FormControl<string | null>;
    visible: FormControl<boolean>;
  }>({
    name: new FormControl(null),
    parentId: new FormControl(null),
    visible: new FormControl(true, { nonNullable: true }),
  });

  async filterCategories() {}

  async loadProducts() {
    this.isLoading = true;
    const { products, total } = await this.productService.listProducts();
    this.products = products;
    this.isLoading = false;
  }
}
