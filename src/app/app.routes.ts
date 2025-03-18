import { Routes } from '@angular/router';
import { AuthPageComponent } from './features/auth/pages/auth-page.component';
import { loggedGuard } from '@core/guards/auth/logged.guard';
import { LoggedLayoutComponent } from '@shared/layouts/logged-layout/logged-layout.component';
import { unloggedGuard } from '@core/guards/auth/unlogged.guard';


export const routes: Routes = [
  {
    path: 'login',
    component: AuthPageComponent,
    title: 'Entre ou registre-se',
    canActivate: [loggedGuard],
  },
  {
    path: '',
    component: LoggedLayoutComponent,
    canActivate: [unloggedGuard],
    title:'Dashboard',
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
                import('./features/categories/pages/categories-page.component').then(
                  (c) => c.CategoriesPageComponent
                ),
                title: 'Categorias',
            },
          ]
      }
    ],
  },
];
