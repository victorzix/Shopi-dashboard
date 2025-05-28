import { Inject, Injectable } from '@angular/core';
import { User } from '../../users/models/user.model';
import {
  BehaviorSubject,
  catchError,
  finalize,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { LoginData } from '../models/login-data.model';
import { AuthService } from '../services/auth.service';
import ErrorHandlerUtils from '@utils/error-handler.utils';
import { Router } from '@angular/router';
import ToastUtils from '@utils/toast.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private authenticatedUserSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) {
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      this.authenticatedUserSubject.next(JSON.parse(storedUser));
    }
  }

  loginUser(credentials: LoginData) {
    this.loadingSubject.next(true);
    const loadingToast = ToastUtils.showLoadingToast(
      'Carregando...'
    );
    this.authService
      .login(credentials)
      .pipe(
        switchMap(() => this.authService.getAuthenticatedUser()),
        tap((user: User) => {
          if (user) {
            this.authenticatedUserSubject.next(user);
            localStorage.setItem('authenticatedUser', JSON.stringify(user));
            this.router.navigate(['dashboard']);
          }
        }),
        catchError((err) => {
          ErrorHandlerUtils.handleError(err);
          this.authenticatedUserSubject.next(null);
          localStorage.removeItem('authenticatedUser');
          this.router.navigate(['login']);
          return of(null);
        }),
        finalize(() => {
          ToastUtils.dismissLoadingToast(loadingToast);
          this.loadingSubject.next(false);
        })
      )
      .subscribe();
  }

  logoutUser() {
    this.authenticatedUserSubject.next(null);
    localStorage.removeItem('authenticatedUser');
    this.router.navigate(['login']);
  }

  get authenticatedUser(): User | null {
    return this.authenticatedUserSubject.getValue();
  }

  get isLoading(): boolean {
    return this.loadingSubject.getValue();
  }
}
