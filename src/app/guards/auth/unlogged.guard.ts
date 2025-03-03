import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const unloggedGuard: CanActivateFn = (route, state) => {
   const token: string | null = localStorage.getItem('token');
    const router = inject(Router);

    if (token == null) {
      router.navigate(['/login']);
      return false;
    }

    return true;
};
