import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { tap } from 'rxjs';
import { CanActivateType } from '../models/can-activate.model';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({ providedIn: 'root' })
class IsAuth {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- no need to use next and state
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateType {
        return this.authService.isAuthenticated$.pipe(
            tap((isAuthenticated) => {
                if (!isAuthenticated) {
                    this.router.navigateByUrl('/login').catch((e) => console.error(e));
                }
            })
        );
    }
}

export const AuthenticationGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): CanActivateType => {
    return inject(IsAuth).canActivate(next, state);
};
