import { Component } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [],
  imports: [CommonModule, FormsModule, LogoComponent],
})
export class SideBarComponent {
  visible: boolean = false;
  checked: boolean = false;
}
