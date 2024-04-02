import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTableComponent } from './income-table.component';
import { HttpClientModule } from '@angular/common/http';
import {
    NbDialogModule,
    NbThemeModule,
    NbSidebarModule,
    NbMenuModule,
    NbCardModule,
    NbSpinnerModule
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FinanceModule } from '../../../../modules/finance/lib/finance.module';

describe('IncomeTableComponent', () => {
    let component: IncomeTableComponent;
    let fixture: ComponentFixture<IncomeTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IncomeTableComponent],
            imports: [
                HttpClientModule,
                StoreModule.forRoot(),
                EffectsModule.forRoot(),
                FinanceModule,
                NbDialogModule.forRoot(),
                NbThemeModule.forRoot(),
                NbSidebarModule.forRoot(),
                NbMenuModule.forRoot(),
                NbCardModule,
                NbSpinnerModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(IncomeTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
