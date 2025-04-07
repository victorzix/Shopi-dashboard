import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { Router } from '@angular/router';
import ToastUtils from '@utils/toast.utils';
import { AuthService } from '../../services/auth.service';
import { RegisterData } from '../../models/register-data.model';

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
    const formData: RegisterData = {
      email: this.registerForm.value.email ?? '',
      name: this.registerForm.value.name ?? '',
      password: this.registerForm.value.password ?? '',
      role: 'administrator',
    };

    this.authService.register(formData).then(() => {
      this.registerForm.reset();
    });
  }
}
