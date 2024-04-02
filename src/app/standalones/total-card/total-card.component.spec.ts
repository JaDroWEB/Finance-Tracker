import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCardComponent } from './total-card.component';
import { NbStatusService } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

describe('TotalCardComponent', () => {
    let component: TotalCardComponent;
    let fixture: ComponentFixture<TotalCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TotalCardComponent, TranslateModule.forRoot()],
            providers: [NbStatusService]
        }).compileComponents();

        fixture = TestBed.createComponent(TotalCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
