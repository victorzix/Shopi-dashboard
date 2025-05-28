import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/header/header.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './logged-layout.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoggedLayoutComponent {
  routeData: string = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.routeData = this.router.url;
        this.cdr.detectChanges();
      }, 0);
    });
  }
}
