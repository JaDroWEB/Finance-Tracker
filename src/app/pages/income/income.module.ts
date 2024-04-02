import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { INCOME_ROUTES } from './income.routes';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { IncomeComponent } from './income.component';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FinanceModule } from '../../../modules/finance/lib/finance.module';
import { LineChartComponent } from '../../standalones/line-chart/line-chart.component';
import { IncomeTableComponent } from './income-table/income-table.component';
import { NbCardModule, NbSpinnerModule, NbActionsModule, NbTooltipModule, NbDialogModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [IncomeComponent, IncomeTableComponent],
    imports: [
        RouterModule.forChild(INCOME_ROUTES),
        FinanceModule,
        AsyncPipe,
        PieChartComponent,
        LineChartComponent,
        FinanceModule,
        DatePipe,
        CurrencyPipe,
        NbCardModule,
        NbSpinnerModule,
        TranslateModule,
        NbActionsModule,
        NbTooltipModule,
        NbDialogModule.forRoot()
    ]
})
export class IncomeModule {}
