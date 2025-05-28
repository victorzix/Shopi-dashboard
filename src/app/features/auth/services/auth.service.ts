import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpHeaders } from '../../../common/httpCommons';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginData } from '../models/login-data.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterResponse } from '../models/register-response.model';
import { RegisterData } from '../models/register-data.model';
import ErrorHandlerUtils from '@utils/error-handler.utils';
import ToastUtils from '@utils/toast.utils';
import { User } from '../../users/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/auth/login-admin`,
      data,
      {
        ...httpHeaders,
      }
    );
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/get-data`, {
      ...httpHeaders,
    });
  }

  async register(data: RegisterData) {
    const loadingToast = ToastUtils.showLoadingToast('Registrando usuário...');
    try {
      const result = this.http.post<RegisterResponse>(
        `${environment.apiUrl}/admin/register`,
        data,
        {
          ...httpHeaders,
        }
      );
      const response = await lastValueFrom(result);

      ToastUtils.showToast(
        'success',
        'Usuário registrado com sucesso',
        1300,
        'Email de confirmação enviado para o seu e-mail.'
      );
      ToastUtils.dismissLoadingToast(loadingToast);
      return response;
    } catch (err: any) {
      ToastUtils.dismissLoadingToast(loadingToast);
      ErrorHandlerUtils.handleError(err);
      throw err;
    }
  }

  async confirmEmail(token: string) {
    try {
      const params = new HttpParams({
        fromObject: { token },
      });

      const result = this.http.post<LoginResponse>(
        `${environment.apiUrl}/auth/confirm-email`,
        {},
        {
          params,
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
          },
        }
      );
      const response = await lastValueFrom(result);
      return response;
    } catch (err: any) {
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  async resendEmailConfirmation(token: string) {
    try {
      const params = new HttpParams({
        fromObject: { token },
      });

      const result = this.http.post<LoginResponse>(
        `${environment.apiUrl}/auth/resend-confirmation-email`,
        {},
        {
          params,
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
          },
        }
      );
      const response = await lastValueFrom(result);
      ToastUtils.showToast('success', 'Email enviado com sucesso');
      return response;
    } catch (err: any) {
      if (
        err?.error?.errors &&
        Array.isArray(err.error.errors) &&
        err.error.errors.length > 0
      ) {
        const errorMessage = err.error.errors[0];
        if (
          typeof errorMessage === 'string' &&
          errorMessage.includes('TimeLeft')
        ) {
          const match = errorMessage.match(/TimeLeft\s*=\s*(\d+)/);

          if (match && match[1]) {
            const timeLeftValue = parseInt(match[1], 10);

            const minutes = Math.floor(timeLeftValue / 60);
            const seconds = timeLeftValue % 60;

            ToastUtils.showToast(
              'error',
              'Erro ao reenviar código',
              4000,
              `Tempo restante para envio de novo código: ${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
            return null;
          }
        }
      }
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }
}
