import { Routes } from '@angular/router';
import { NoAuthenticationGuard } from './services/no-authentication-guard';
import { LoginComponent } from './components/login/login.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        canActivate: [NoAuthenticationGuard],
        component: LoginComponent
    },
    { path: '**', redirectTo: '/login' }
];
