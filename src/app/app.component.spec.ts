import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { NbStatusService } from '@nebular/theme';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, AuthModule.forRoot(environment.authConfig), TranslateModule.forRoot()],
            providers: [NbStatusService]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
