import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideShoppingBag } from '@ng-icons/lucide';
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, NgIcon ],
  viewProviders: [provideIcons({ lucideShoppingBag, lucideChevronRight })],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() type: 'mini' | 'medium' | 'large' = 'large';
}
