import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { LoginData } from '../../models/login-data.model';
import { AuthStore } from '../../store/auth.store';

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
    public authStore: AuthStore,
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

    this.authStore.loginUser(formData);
  }
}
