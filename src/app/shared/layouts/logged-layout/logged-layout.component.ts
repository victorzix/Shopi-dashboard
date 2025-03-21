import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/header/header.component';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './logged-layout.component.html',
})
export class LoggedLayoutComponent {

}
