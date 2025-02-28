import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext'; // Para evitar possíveis erros com pInputText
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../services/api/auth/auth.service';
import { ILoginData } from '../../../interfaces/auth/ilogin-data';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [
    ToastModule,
    FloatLabel,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    KeyFilterModule,
  ],
  providers: [MessageService],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router // Inject Router
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
      const errorMessages = loginResult.error.error.errors.map(
        (err: string) => ({
          severity: 'error',
          summary: 'Erro ao realizar login',
          detail: err,
        })
      );
      this.messageService.addAll(errorMessages);
    } else if (loginResult.token) {
      localStorage.setItem('token', loginResult.token);
      this.router.navigate(['']);
    }
  }
}
