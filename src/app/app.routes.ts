import { Routes } from '@angular/router';
import { AuthenticationGuard } from '../modules/auth/services/authentication-guard';

export const ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('../modules/auth/authentication.module').then((m) => m.AuthenticationModule)
    },
    {
        path: 'overview',
        loadChildren: () => import('./pages/overview/overview.module').then((m) => m.OverviewModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'expenses',
        loadChildren: () => import('./pages/expenses/expenses.module').then((m) => m.ExpensesModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'income',
        loadChildren: () => import('./pages/income/income.module').then((m) => m.IncomeModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule),
        canActivate: [AuthenticationGuard]
    },
    {
        path: '404',
        loadComponent: () =>
            import('./standalones/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: '**', redirectTo: '404' }
];
