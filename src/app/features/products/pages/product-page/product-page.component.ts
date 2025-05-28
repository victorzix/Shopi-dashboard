import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.titleService.setTitle('produto');
    });
  }
}
