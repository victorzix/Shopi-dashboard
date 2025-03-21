import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Shopi-dashboard';
  }
