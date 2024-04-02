import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesComponent } from './expenses.component';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { LineChartComponent } from '../../standalones/line-chart/line-chart.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import {
    NbCardModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbThemeModule
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';

describe('ExpensesComponent', () => {
    let component: ExpensesComponent;
    let fixture: ComponentFixture<ExpensesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExpensesComponent, ExpensesTableComponent],
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot(),
                TranslateModule.forRoot(),
                NbDialogModule.forRoot(),
                PieChartComponent,
                LineChartComponent,
                NbThemeModule.forRoot(),
                NbSidebarModule.forRoot(),
                NbMenuModule.forRoot(),
                NbCardModule,
                NbSpinnerModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
