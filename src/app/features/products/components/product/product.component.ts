import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  today: Date = new Date();
}
