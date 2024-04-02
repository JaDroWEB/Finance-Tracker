import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Options, SeriesColumnOptions, SeriesPieOptions } from 'highcharts';
import { distinctUntilChanged, map, skip } from 'rxjs/operators';
import { Observable, combineLatest, zip } from 'rxjs';
import { FinanceFacade, LoadState, Transaction } from '../../../modules/finance/public-api';
import { TranslateService } from '@ngx-translate/core';
import { PeriodSelectorService } from '../../services/period-selector.service';
import { ColumnChartData } from '../../standalones/column-chart/column-chart.component';
import { PieChartData } from '../../standalones/pie-chart/pie-chart.component';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {
    public readonly pieChartData$: Observable<PieChartData>;
    public readonly pieChartState$: Observable<LoadState>;

    public readonly columnChartData$: Observable<ColumnChartData>;
    public readonly columnChartState$: Observable<LoadState>;

    public readonly incomeTotal$: Observable<string>;
    public readonly expensesTotal$: Observable<string>;

    constructor(
        private readonly financeFacade: FinanceFacade,
        private readonly translate: TranslateService,
        private readonly periodService: PeriodSelectorService
    ) {
        this.financeFacade.loadFinanceTransactions();

        this.pieChartState$ = this.financeFacade.financeTransactions.loadState$;
        this.columnChartState$ = this.financeFacade.financeTransactions.loadState$;

        const incomeTransactionsTotal$ = this.financeFacade.financeTransactions.incomeTransactions$.pipe(
            map((transactions) => transactions.reduce((acc, transaction) => acc + transaction.value, 0)),
            distinctUntilChanged()
        );

        const expensesTransactionsTotal$ = this.financeFacade.financeTransactions.expensesTransactions$.pipe(
            map((transactions) => transactions.reduce((acc, transaction) => acc + transaction.value, 0)),
            distinctUntilChanged()
        );

        this.incomeTotal$ = incomeTransactionsTotal$.pipe(map((total) => total.toFixed(2) + '€'));
        this.expensesTotal$ = expensesTransactionsTotal$.pipe(map((total) => total.toFixed(2) + '€'));

        this.pieChartData$ = combineLatest([incomeTransactionsTotal$, expensesTransactionsTotal$]).pipe(
            map(([incomeTotal, expensesTotal]) => ({
                seriesOptions: this.getPieSeriesOptions(incomeTotal, expensesTotal)
            }))
        );

        this.columnChartData$ = zip([
            this.financeFacade.financeTransactions.expensesTransactions$.pipe(skip(1)),
            this.financeFacade.financeTransactions.incomeTransactions$.pipe(skip(1)),
            this.periodService.selectedPeriod$
        ]).pipe(
            map(([expenses, income, period]) => {
                switch (period.value) {
                    case 7:
                        return this.resolveUnderMonthData(expenses, income, period.value);
                    case 30:
                        return this.resolveUnderMonthData(expenses, income, period.value);
                    case 365:
                        return this.resolveYearData(expenses, income);
                    default:
                        return this.resolveAllTimeData(expenses, income);
                }
            })
        );
    }

    private resolveUnderMonthData(
        expenses: Transaction[],
        income: Transaction[],
        periodValue: number
    ): ColumnChartData {
        const xAxis = [];
        for (let i = 0; i < periodValue; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            xAxis.unshift(date.toISOString().split('T')[0]);
        }

        const values = xAxis.map((date) => {
            const expensesValue = expenses
                .filter((transaction) => transaction.createdAt.toISOString().split('T')[0] === date)
                .reduce((acc, transaction) => acc + transaction.value, 0);

            const incomeValue = income
                .filter((transaction) => transaction.createdAt.toISOString().split('T')[0] === date)
                .reduce((acc, transaction) => acc + transaction.value, 0);

            return { expensesValue, incomeValue };
        });

        const seriesOptions: SeriesColumnOptions[] = this.getColumnSeriesOptions(values);
        const chartOptions: Options = this.getChartOptions(xAxis);

        return { seriesOptions, chartOptions };
    }

    private resolveYearData(expenses: Transaction[], income: Transaction[]): ColumnChartData {
        const xAxis = [];
        const values = [];

        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            xAxis.unshift(this.translate.instant(date.toLocaleString('default', { month: 'long' })) as string);
            values.unshift({
                expensesValue: expenses
                    .filter((transaction) => transaction.createdAt.getMonth() === date.getMonth())
                    .reduce((acc, transaction) => acc + transaction.value, 0),
                incomeValue: income
                    .filter((transaction) => transaction.createdAt.getMonth() === date.getMonth())
                    .reduce((acc, transaction) => acc + transaction.value, 0)
            });
        }

        const seriesOptions: SeriesColumnOptions[] = this.getColumnSeriesOptions(values);
        const chartOptions: Options = this.getChartOptions(xAxis);

        return { seriesOptions, chartOptions };
    }

    private resolveAllTimeData(expenses: Transaction[], income: Transaction[]): ColumnChartData {
        const xAxis = [];
        const values = [];

        for (let i = 0; i < 12; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            xAxis.unshift(this.translate.instant(date.toLocaleString('default', { month: 'long' })) as string);
            values.unshift({
                expensesValue: expenses
                    .filter((transaction) => transaction.createdAt.getMonth() === date.getMonth())
                    .reduce((acc, transaction) => acc + transaction.value, 0),
                incomeValue: income
                    .filter((transaction) => transaction.createdAt.getMonth() === date.getMonth())
                    .reduce((acc, transaction) => acc + transaction.value, 0)
            });
        }

        const seriesOptions: SeriesColumnOptions[] = this.getColumnSeriesOptions(values);
        const chartOptions: Options = this.getChartOptions(xAxis);

        return { seriesOptions, chartOptions };
    }

    private getColumnSeriesOptions(values: { expensesValue: number; incomeValue: number }[]): SeriesColumnOptions[] {
        return [
            {
                type: 'column',
                name: this.translate.instant('Expenses') as string,
                data: values.map((item) => ({
                    name: this.translate.instant('Expenses') as string,
                    y: item.expensesValue
                }))
            },
            {
                type: 'column',
                name: this.translate.instant('Incomes') as string,
                data: values.map((item) => ({
                    name: this.translate.instant('Incomes') as string,
                    y: item.incomeValue
                }))
            }
        ];
    }

    private getPieSeriesOptions(incomeTotal: number, expensesTotal: number): SeriesPieOptions[] {
        return [
            {
                type: 'pie',
                name: this.translate.instant('Income vs Expenses') as string,
                data: [
                    {
                        name: this.translate.instant('Expenses') as string,
                        y: expensesTotal
                    },
                    {
                        name: this.translate.instant('Income') as string,
                        y: incomeTotal
                    }
                ]
            }
        ];
    }

    private getChartOptions(xAxis: string[]): Options {
        return {
            xAxis: {
                categories: xAxis
            }
        };
    }
}
