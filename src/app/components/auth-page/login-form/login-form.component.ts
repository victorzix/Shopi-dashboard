import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/api/auth/auth.service';
import { ILoginData } from '../../../interfaces/auth/ilogin-data';
import { Router } from '@angular/router';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import ToastUtils from '../../../../utils/toast-utils';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

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
    const formData: ILoginData = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };

    const loginResult = await this.authService.login(formData);
    if (loginResult.error) {
      loginResult.error.error.errors.forEach((err: string) => {
        ToastUtils.showToast('error', 'Erro ao realizar login', 3000, err);
      });
    } else if (loginResult.token) {
      ToastUtils.showToast('loading', 'Redirecionando para dashboard', 3500);

      localStorage.setItem('token', loginResult.token);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 3000);
    }
  }
}
