import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/pages/auth-page.component';
import { loggedGuard } from '@core/guards/auth/logged.guard';
import { LoggedLayoutComponent } from '@shared/layouts/logged-layout/logged-layout.component';
import { unloggedGuard } from '@core/guards/auth/unlogged.guard';
import { ConfirmEmailPageComponent } from './features/auth/pages/confirm-email-page/confirm-email-page.component';
import { EmailConfirmationFailureComponent } from '@shared/failures/email-confirmation-failure/email-confirmation-failure.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthPageComponent,
    title: 'Entre ou registre-se',
    canActivate: [loggedGuard],
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailPageComponent,
    title: 'Confirmando email',
    canActivate: [loggedGuard],
    children: [
      {
        path: 'failed',
        title: 'Email não confirmado',
        component: EmailConfirmationFailureComponent,
      },
    ],
  },
  {
    path: '',
    component: LoggedLayoutComponent,
    canActivate: [unloggedGuard],
    title: 'Dashboard',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/products/pages/products-page.component').then(
            (c) => c.ProductsPageComponent
          ),
        title: 'Shopi',
      },
      {
        path: 'produtos',
        loadComponent: () =>
          import('./features/products/pages/products-page.component').then(
            (c) => c.ProductsPageComponent
          ),
        children: [
          {
            path: 'categorias',
            loadComponent: () =>
              import(
                './features/categories/pages/categories-page.component'
              ).then((c) => c.CategoriesPageComponent),
            title: 'Categorias',
          },
          {
            path: '',
            loadComponent: () =>
              import(
                './features/products/pages/products-list/products-list.component'
              ).then((c) => c.ProductsListComponent),
            title: 'Produtos',
          },
        ],
      },
    ],
  },
];
