import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [RouterOutlet],
  providers: [Router],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {}
