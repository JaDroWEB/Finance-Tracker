import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NbCardModule, NbLayoutModule, NbButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    constructor(private readonly authService: AuthService) {}

    public login(): void {
        this.authService.loginWithRedirect();
    }
}
