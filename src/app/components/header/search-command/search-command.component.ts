import { CommonModule } from '@angular/common';
import { Component, HostListener, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlignEndHorizontal,
  lucideBox,
  lucideDollarSign,
  lucideGoal,
  lucideHouse,
  lucideLogOut,
  lucideReceipt,
  lucideReceiptText,
  lucideSearch,
  lucideSettings2,
  lucideSheet,
  lucideTicketPercent,
  lucideUser,
  lucideUsers,
} from '@ng-icons/lucide';
import {
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmCommandComponent,
  HlmCommandEmptyDirective,
  HlmCommandGroupComponent,
  HlmCommandGroupLabelComponent,
  HlmCommandIconDirective,
  HlmCommandItemComponent,
  HlmCommandListComponent,
  HlmCommandSearchComponent,
  HlmCommandSearchInputComponent,
  HlmCommandSeparatorComponent,
} from '@spartan-ng/ui-command-helm';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
} from '@spartan-ng/ui-dialog-helm';

@Component({
  selector: 'app-search-command',
  standalone: true,
  imports: [
    NgIcon,
    HlmCommandComponent,
    HlmCommandItemComponent,
    HlmCommandSeparatorComponent,
    HlmCommandGroupComponent,
    HlmCommandListComponent,
    HlmCommandIconDirective,
    HlmCommandSearchInputComponent,
    HlmCommandSearchComponent,
    HlmCommandGroupLabelComponent,
    HlmCommandEmptyDirective,
    CommonModule,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    RouterLink,
  ],
  templateUrl: './search-command.component.html',
  viewProviders: [
    provideIcons({
      lucideSearch,
      lucideHouse,
      lucideUser,
      lucideLogOut,
      lucideSettings2,
      lucideSheet,
      lucideDollarSign,
      lucideAlignEndHorizontal,
      lucideBox,
      lucideGoal,
      lucideTicketPercent,
      lucideReceipt,
      lucideReceiptText,
      lucideUsers,
    }),
  ],
})
export class SearchCommandComponent {
  public viewchildDialogRef = viewChild(BrnDialogComponent);

  closeDialog() {
    this.viewchildDialogRef()?.close({});
  }

  openDialog() {
    this.viewchildDialogRef()?.open();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openDialog();
    }
  }
}
