import { Component } from '@angular/core';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideShoppingBag, lucideBox } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-body',
  imports: [
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    NgIcon,
    CommonModule,
    ListItemComponent,
  ],
  viewProviders: [provideIcons({ lucideShoppingBag, lucideChevronDown, lucideBox })],
  templateUrl: './side-bar-body.component.html',
})
export class SideBarBodyComponent {
  constructor(private router: Router) {}

  isActive(routes: string[]): boolean {
    return routes.some((route) => {
      const current = this.router.url.replace(/^\//, '');
      return current === route || current.startsWith(`${route}/`);
    });
  }
}
