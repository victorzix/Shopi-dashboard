import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/products/product.model';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product: Product;
  public productImage: string =
    'assets/common/no-product-image-placeholder.png';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    if (this.product.imagesUrls) {
      this.productImage = this.product.imagesUrls[0];
    }
  }

  clickOnProduct() {
    this.router.navigate([`produtos/produto`], {
      queryParams: { id: this.product.id },
    });
  }
}
