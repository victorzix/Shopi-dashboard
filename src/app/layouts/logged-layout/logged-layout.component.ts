import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './logged-layout.component.html',
  styleUrl: './logged-layout.component.scss'
})
export class LoggedLayoutComponent {

}
