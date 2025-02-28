import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loggedGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  const router = inject(Router);

  if (token != null) {
    router.navigate(['']);
    return false;
  }

  return true;
};
