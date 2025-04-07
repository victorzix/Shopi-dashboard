import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HlmButtonDirective } from '@shared/libs/ui/ui-button-helm/src';
import {
  HlmDialogComponent,
  HlmDialogModule,
} from '@shared/libs/ui/ui-dialog-helm/src';
import {
  BrnDialogContentDirective,
  BrnDialogModule,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-email-confirmation-failure',
  imports: [HlmDialogModule, BrnDialogModule, HlmButtonDirective],
  templateUrl: './email-confirmation-failure.component.html',
})
export class EmailConfirmationFailureComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  async resendEmail() {
    await this.route.queryParamMap.subscribe(async (params) => {
      const token = params.get('token');
      if (token) {
        const response = await this.authService.resendEmailConfirmation(token);
      }
    });
  }
}
