import { Component } from '@angular/core';
import { HlmSpinnerComponent } from '../../../../shared/libs/ui/ui-spinner-helm/src/lib/hlm-spinner.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [HlmSpinnerComponent, CommonModule, RouterModule],
  templateUrl: './confirm-email-page.component.html',
})
export class ConfirmEmailPageComponent {
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.route.queryParamMap.subscribe(async (params) => {
      const token = params.get('token');
      if (token) {
        const response = await this.authService.confirmEmail(token);
        if (!response) {
          this.router.navigate(['confirm-email/failed'], {
            queryParams: { token: token },
          });
        }
        if (response?.token) {
          localStorage.setItem('token', response?.token);
          this.router.navigate(['/']);
        }
      }
    });
  }
}
