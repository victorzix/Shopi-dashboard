import { Component } from '@angular/core';
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective,
} from '@spartan-ng/brain/sheet';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetFooterComponent,
} from '@spartan-ng/ui-sheet-helm';
import { CommonModule } from '@angular/common';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { SideBarHeaderComponent } from './side-bar-header/side-bar-header.component';
import { SideBarBodyComponent } from './side-bar-body/side-bar-body.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';
import { AuthStore } from 'src/app/features/auth/store/auth.store';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetFooterComponent,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    HlmButtonDirective,
    CommonModule,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
    SideBarHeaderComponent,
    SideBarBodyComponent,
    NgIcon,
  ],
  viewProviders: [provideIcons({ lucideMenu })],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  constructor(public authStore: AuthStore) {}

  logout() {
    this.authStore.logoutUser();
  }
}
