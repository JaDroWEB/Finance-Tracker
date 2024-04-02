import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OVERVIEW_ROUTES } from './overview.routes';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { OverviewComponent } from './overview.component';
import { FinanceModule } from '../../../modules/finance/lib/finance.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { TotalCardComponent } from '../../standalones/total-card/total-card.component';
import { ColumnChartComponent } from '../../standalones/column-chart/column-chart.component';

@NgModule({
    declarations: [OverviewComponent],
    imports: [
        RouterModule.forChild(OVERVIEW_ROUTES),
        FinanceModule,
        PieChartComponent,
        TotalCardComponent,
        ColumnChartComponent,
        NgIf,
        AsyncPipe
    ]
})
export class OverviewModule {}
