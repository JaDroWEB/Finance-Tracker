import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTableComponent } from './expenses-table.component';
import { StoreModule } from '@ngrx/store';
import { FinanceModule } from '../../../../modules/finance/lib/finance.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import {
    NbCardModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbThemeModule
} from '@nebular/theme';

describe('ExpensesTableComponent', () => {
    let component: ExpensesTableComponent;
    let fixture: ComponentFixture<ExpensesTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpensesTableComponent],
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

        fixture = TestBed.createComponent(ExpensesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
