import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/pages/auth-page.component';
import { loggedGuard } from '@core/guards/auth/logged.guard';
import { LoggedLayoutComponent } from '@shared/layouts/logged-layout/logged-layout.component';
import { unloggedGuard } from '@core/guards/auth/unlogged.guard';
import { ConfirmEmailPageComponent } from './features/auth/pages/confirm-email-page/confirm-email-page.component';
import { EmailConfirmationFailureComponent } from '@shared/failures/email-confirmation-failure/email-confirmation-failure.component';
import { ProductComponent } from './features/products/components/product/product.component';
import { ProductsListComponent } from './features/products/pages/products-list/products-list.component';
import { LoginFormComponent } from './features/auth/components/login-form/login-form.component';

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
          import(
            './features/products/pages/products-list/products-list.component'
          ).then((c) => c.ProductsListComponent),
        title: 'Shopi',
      },
      // {
      //   path: 'dashboard/informacoes',
      // },
    ],
  },
  {
    path: 'produtos',
    component: LoggedLayoutComponent,
    canActivate: [unloggedGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/products/pages/products-list/products-list.component'
          ).then((c) => c.ProductsListComponent),
        title: 'Produtos',
      },
      {
        path: 'produto',
        loadComponent: () =>
          import(
            './features/products/pages/product-page/product-page.component'
          ).then((c) => c.ProductPageComponent),
      },
      {
        path: 'categorias',
        loadComponent: () =>
          import('./features/categories/pages/categories-page.component').then(
            (c) => c.CategoriesPageComponent
          ),
        title: 'Categorias',
      },
    ],
  },
];
