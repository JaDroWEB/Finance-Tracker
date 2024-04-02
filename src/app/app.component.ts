import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
    NbButtonModule,
    NbIconModule,
    NbLayoutModule,
    NbMenuItem,
    NbMenuModule,
    NbSelectModule,
    NbSidebarComponent,
    NbSidebarModule
} from '@nebular/theme';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PeriodSelectorService } from './services/period-selector.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NbSidebarModule,
        NbLayoutModule,
        NbButtonModule,
        NbIconModule,
        NbMenuModule,
        NbSelectModule,
        TranslateModule,
        AsyncPipe
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public readonly menuItems: NbMenuItem[] = [
        {
            title: 'Overview',
            icon: 'home-outline',
            link: '/overview'
        },
        {
            title: 'Expenses',
            icon: 'credit-card-outline',
            link: '/expenses'
        },
        {
            title: 'Income',
            icon: 'plus-circle-outline',
            link: '/income'
        }
        // {
        //     title: 'Categories',
        //     icon: 'list-outline',
        //     link: '/categories'
        // }
    ];

    public readonly isLogged$ = this.authService.isAuthenticated$;
    public readonly periods = this.periodService.periods;
    public readonly initSelectPeriod: number;
    public readonly sidebarFixed$: Observable<boolean>;

    @ViewChild(NbSidebarComponent)
    private readonly sidebar?: NbSidebarComponent;

    constructor(
        private readonly authService: AuthService,
        private readonly translate: TranslateService,
        private readonly periodService: PeriodSelectorService,
        private readonly breakpointObserver: BreakpointObserver
    ) {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.initSelectPeriod = this.periodService.selectedPeriodValue;
        this.sidebarFixed$ = this.breakpointObserver.observe('(max-width: 700px)').pipe(map((state) => state.matches));
    }

    public toggleSidebar(): void {
        this.sidebar?.toggle();
    }

    public logout(): void {
        this.authService.logout({
            logoutParams: {
                returnTo: document.location.origin
            }
        });
    }

    public changePeriod(period: number): void {
        this.periodService.selectPeriod(period);
    }
}
