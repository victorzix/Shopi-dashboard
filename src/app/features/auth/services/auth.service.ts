import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpHeaders } from '../../../common/httpCommons';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginData } from '../models/login-data.model';
import { LoginResponse } from '../models/login-response.model';
import { RegisterResponse } from '../models/register-response.model';
import { RegisterData } from '../models/register-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  async login(data: LoginData): Promise<LoginResponse> {
    try {
      const result = this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login-admin`, data, {
        ...httpHeaders,
      });
      const response = await lastValueFrom(result);
      return response;
    } catch (err: any) {
      return { error: err };
    }
  }

  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const result = this.http.post<RegisterResponse>(`${environment.apiUrl}/admin/register`, data, {
        ...httpHeaders,
      });
      const response = await lastValueFrom(result);
      return response;
    } catch (err: any) {
      return { error: err };
    }
  }
}
