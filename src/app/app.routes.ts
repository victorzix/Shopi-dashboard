import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { loggedGuard } from './guards/auth/logged.guard';
import { unloggedGuard } from './guards/auth/unlogged.guard';
import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';
import { LoginFormComponent } from './components/auth-page/login-form/login-form.component';

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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-screen/home-screen.component').then(
            (c) => c.HomeScreenComponent
          ),
        title: 'Shopi',
      },
      {
        path: 'log',
        component: LoginFormComponent,
      },
    ],
  },
];
