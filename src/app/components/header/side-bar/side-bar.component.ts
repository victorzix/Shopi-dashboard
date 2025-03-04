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
import { UserService } from '../../../services/api/user/user.service';
import { IAdmin } from '../../../interfaces/admin/IAdmin';
import { CommonModule } from '@angular/common';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { SideBarHeaderComponent } from "./side-bar-header/side-bar-header.component";
import { SideBarBodyComponent } from "./side-bar-body/side-bar-body.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';

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
  userData: IAdmin | null = null;
  dataLoaded: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data) => {
      if (data) {
        this.userData = data;
        this.dataLoaded = true;
      } else {
        this.userService.getUser().then(() => {
          this.userService.getUserData().subscribe((newData) => {
            if (newData) {
              this.userData = newData;
              this.dataLoaded = true;
            }
          });
        });
      }
    });
  }
}
