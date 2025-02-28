import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext'; // Para evitar possíveis erros com pInputText
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/api/auth/auth.service';
import { IRegisterData } from '../../../interfaces/auth/iregister-data';

@Component({
  selector: 'app-register-form',
  imports: [
    ToastModule,
    FloatLabel,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    KeyFilterModule,
  ],
  providers: [MessageService],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  blockSpace: RegExp = /[^\s]/;

  registerForm = new FormGroup({
    name: new FormControl<string>('victor', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl<string>('vitophaelnev@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl<string>('12345', [
      Validators.required,
      Validators.minLength(3),
    ]),
    document: new FormControl<string>('1234567890', [
      Validators.required,
      Validators.minLength(9),
    ]),
  });

  async register() {
    const formData: IRegisterData = {
      document: this.registerForm.value.document ?? '',
      email: this.registerForm.value.email ?? '',
      name: this.registerForm.value.name ?? '',
      password: this.registerForm.value.password ?? '',
      role: 'customer',
    };

    const registerResult = await this.authService.register(formData);
    if (registerResult.error) {
      const errorMessages = registerResult.error.error.errors.map(
        (err: string) => ({
          severity: 'error',
          summary: 'Erro ao realizar login',
          detail: err,
        })
      );
      this.messageService.addAll(errorMessages);
      return;
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Usuário cadastrado com sucesso'
    })
  }
}
