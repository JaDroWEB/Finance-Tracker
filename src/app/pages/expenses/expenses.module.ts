import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EXPENSES_ROUTES } from './expenses.routes';
import { PieChartComponent } from '../../standalones/pie-chart/pie-chart.component';
import { ExpensesComponent } from './expenses.component';
import { FinanceModule } from '../../../modules/finance/lib/finance.module';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { LineChartComponent } from '../../standalones/line-chart/line-chart.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { NbActionsModule, NbCardModule, NbDialogModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ExpensesComponent, ExpensesTableComponent],
    imports: [
        RouterModule.forChild(EXPENSES_ROUTES),
        FinanceModule,
        AsyncPipe,
        DatePipe,
        CurrencyPipe,
        PieChartComponent,
        LineChartComponent,
        NbCardModule,
        NbSpinnerModule,
        TranslateModule,
        NbActionsModule,
        NbTooltipModule,
        NbDialogModule.forRoot()
    ]
})
export class ExpensesModule {}
