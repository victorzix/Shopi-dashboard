import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  @Input() type: 'mini' | 'medium' | 'large' = 'large';
}
