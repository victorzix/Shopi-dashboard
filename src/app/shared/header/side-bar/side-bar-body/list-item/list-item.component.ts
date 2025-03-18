import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-item',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input() title: string | null = null;
  @Input() route: string | null = null;

  constructor(public router: Router) {}

  get isActive(): boolean {
    return this.router.url === `/${this.route}`;
  }
}
