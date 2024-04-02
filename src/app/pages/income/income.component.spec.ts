import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LineChartComponent } from '../../standalones/line-chart/line-chart.component';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { IncomeTableComponent } from './income-table/income-table.component';
import {
    NbCardModule,
    NbDialogModule,
    NbMenuModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbThemeModule
} from '@nebular/theme';

describe('IncomeComponent', () => {
    let component: IncomeComponent;
    let fixture: ComponentFixture<IncomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NbDialogModule.forRoot(),
                PieChartComponent,
                LineChartComponent,
                StoreModule.forRoot({}),
                TranslateModule.forRoot(),
                NbThemeModule.forRoot(),
                NbSidebarModule.forRoot(),
                NbMenuModule.forRoot(),
                NbCardModule,
                NbSpinnerModule
            ],
            declarations: [IncomeComponent, IncomeTableComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(IncomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
