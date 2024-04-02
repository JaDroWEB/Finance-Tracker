import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { NoPreloading, provideRouter, withPreloading } from '@angular/router';

import { ROUTES } from './app.routes';
import { NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(ROUTES, withPreloading(NoPreloading)),
        provideStore(),
        provideEffects(),
        provideHttpClient(),
        importProvidersFrom(
            NbThemeModule.forRoot(),
            StoreModule.forRoot({}, {}),
            EffectsModule.forRoot(),
            NbSidebarModule.forRoot(),
            NbEvaIconsModule,
            NbMenuModule.forRoot(),
            AuthModule.forRoot(environment.authConfig),
            TranslateModule.forRoot({
                defaultLanguage: 'en',
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                }
            }),
            BrowserAnimationsModule
        )
    ]
};
