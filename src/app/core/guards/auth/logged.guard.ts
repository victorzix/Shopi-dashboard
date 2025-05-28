import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from 'src/app/features/auth/store/auth.store';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const user = authStore.authenticatedUser;

  if (user) {
    router.navigate(['dashboard']);
    return false;
  }

  return true;
};
