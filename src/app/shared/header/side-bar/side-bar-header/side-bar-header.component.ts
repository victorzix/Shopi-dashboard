import { Component, Input } from '@angular/core';
import { HlmSkeletonComponent } from '../../../libs/ui/ui-skeleton-helm/src/lib/hlm-skeleton.component';
import {
  HlmSheetDescriptionDirective,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import { LogoComponent } from '../../../logo/logo.component';
import { CommonModule } from '@angular/common';
import { Admin } from '@core/models/admin/admin.model';

@Component({
  selector: 'app-side-bar-header',
  imports: [
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,
    HlmSkeletonComponent,
    LogoComponent,
    CommonModule,
  ],
  templateUrl: './side-bar-header.component.html',
})
export class SideBarHeaderComponent {
  @Input() userData: Admin | null = null;
  @Input() dataLoaded: boolean = false;
}
