import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { FinanceModule } from '../../../modules/finance/lib/finance.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TotalCardComponent } from '../../standalones/total-card/total-card.component';
import { NbStatusService } from '@nebular/theme';
import { ColumnChartComponent } from '../../standalones/column-chart/column-chart.component';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OverviewComponent],
            imports: [
                PieChartComponent,
                TotalCardComponent,
                ColumnChartComponent,
                FinanceModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot(),
                HttpClientModule,
                TranslateModule.forRoot()
            ],
            providers: [NbStatusService]
        }).compileComponents();

        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
