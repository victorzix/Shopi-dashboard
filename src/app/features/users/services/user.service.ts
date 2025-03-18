import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpHeaders } from '../../../common/httpCommons';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import ErrorHandlerUtils from '../../../../utils/error-handler.utils';
import { Admin } from '@core/models/admin/admin.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<Admin | null> =
    new BehaviorSubject<Admin | null>(null);

  constructor(private http: HttpClient) {}

  async getUser(): Promise<Admin | null> {
    try {
      const result = this.http.get<Admin>(
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

  getUserData(): Observable<Admin | null> {
    return this.userSubject.asObservable();
  }
}
