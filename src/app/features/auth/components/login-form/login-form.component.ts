import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginData } from '../../models/login-data.model';
import ToastUtils from '@utils/toast.utils';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmLabelDirective,
    HlmInputDirective,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) {}

  blockSpace: RegExp = /[^\s]/;

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  async login() {
    const formData: LoginData = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };

    const loginResult = await this.authService.login(formData);

    if (loginResult?.token) {
      ToastUtils.showToast('loading', 'Redirecionando para dashboard', 3500);

      localStorage.setItem('token', loginResult?.token);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 3000);
    }
  }
}
