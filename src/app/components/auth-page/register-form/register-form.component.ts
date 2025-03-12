import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/api/auth/auth.service';
import { IRegisterData } from '../../../interfaces/auth/register-data.interface';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { Router } from '@angular/router';
import ToastUtils from '../../../../utils/toast.utils';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmLabelDirective,
    HlmInputDirective,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  constructor(
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) {}

  blockSpace: RegExp = /[^\s]/;

  registerForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  async register() {
    const formData: IRegisterData = {
      email: this.registerForm.value.email ?? '',
      name: this.registerForm.value.name ?? '',
      password: this.registerForm.value.password ?? '',
      role: 'administrator',
    };

    const registerResult = await this.authService.register(formData);
    if (registerResult.error) {
      registerResult.error.error.errors.forEach((err: string) => {
        ToastUtils.showToast('error', 'Erro ao se registrar', 3000, err);
      });
    } else if (registerResult.token) {
      ToastUtils.showToast('success', 'Usuário cadastrado com sucesso', 1300);

      setTimeout(() => {
        ToastUtils.showToast('loading', 'Redirecionando para dashboard', 2100);
      }, 1000);
      localStorage.setItem('token', registerResult.token);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 3000);
    }
  }
}
