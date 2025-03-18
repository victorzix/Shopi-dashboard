import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'app-create-subcategory-form',
  imports: [
    CommonModule,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
  ],
  templateUrl: './create-subcategory-form.component.html',
  styleUrl: './create-subcategory-form.component.scss',
})
export class CreateSubcategoryFormComponent {}
