import { Component, LOCALE_ID } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import {
  BrnPopoverCloseDirective,
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import {
  HlmPopoverCloseDirective,
  HlmPopoverContentDirective,
} from '@spartan-ng/ui-popover-helm';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { SearchCommandComponent } from "./search-command/search-command.component";

@Component({
  selector: 'app-header',
  imports: [
    SideBarComponent,
    // BrnPopoverCloseDirective,
    BrnPopoverComponent,
    BrnPopoverContentDirective,
    BrnPopoverTriggerDirective,
    // HlmPopoverCloseDirective,
    HlmPopoverContentDirective,
    TranslocoModule,
    CommonModule,
    SearchCommandComponent
],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  defaultLanguage: string = localStorage.getItem('language') || 'pt-BR';
  constructor(private translocoService: TranslocoService) {}

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('language', lang);
    this.defaultLanguage = lang;
  }
}
