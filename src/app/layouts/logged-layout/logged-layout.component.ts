import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './logged-layout.component.html',
  styleUrl: './logged-layout.component.scss'
})
export class LoggedLayoutComponent {

}
