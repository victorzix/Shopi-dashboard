import { Component, Input } from '@angular/core';
import { IAdmin } from '../../../../interfaces/admin/admin.interface';
import { HlmSkeletonComponent } from '../../../libs/ui/ui-skeleton-helm/src/lib/hlm-skeleton.component';
import {
  HlmSheetDescriptionDirective,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import { LogoComponent } from '../../../logo/logo.component';
import { CommonModule } from '@angular/common';

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
  @Input() userData: IAdmin | null = null;
  @Input() dataLoaded: boolean = false;
}
