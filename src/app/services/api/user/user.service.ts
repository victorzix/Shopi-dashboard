import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpHeaders } from '../../../common/httpCommons';
import { ILoginResponse } from '../../../interfaces/auth/ilogin-response';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { IAdmin } from '../../../interfaces/admin/IAdmin';
import ToastUtils from '../../../../utils/toast-utils';
import ErrorHandlerUtils from '../../../../utils/error-handler-utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<IAdmin | null> =
    new BehaviorSubject<IAdmin | null>(null);

  constructor(private http: HttpClient) {}

  async getUser(): Promise<IAdmin | null> {
    try {
      const result = this.http.get<IAdmin>(
        `${environment.apiUrl}/admin/get-data`,
        {
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const response = await lastValueFrom(result);
      this.userSubject.next(response);
      return response;
    } catch (err: any) {
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  getUserData(): Observable<IAdmin | null> {
    return this.userSubject.asObservable();
  }
}
