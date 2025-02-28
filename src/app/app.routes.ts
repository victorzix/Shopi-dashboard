import { Routes } from '@angular/router';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { loggedGuard } from './guards/auth/logged.guard';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent, title: 'Shopi' },
  { path: 'login', component: AuthPageComponent, title: 'Entre ou registre-se', canActivate: [loggedGuard]}
];
