import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from 'src/app/features/auth/store/auth.store';

export const unloggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const user = authStore.authenticatedUser;

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (state.url === '/') {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
