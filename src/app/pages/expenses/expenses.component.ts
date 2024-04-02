import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Category, FinanceFacade, LoadState, Transaction } from '../../../modules/finance/public-api';
import { Observable, auditTime, combineLatest, map, skip } from 'rxjs';
import { PieChartData } from '../../standalones/pie-chart/pie-chart.component';
import { TranslateService } from '@ngx-translate/core';
import { SeriesLineOptions, SeriesPieOptions } from 'highcharts';
import { LineChartData } from '../../standalones/line-chart/line-chart.component';
import { PeriodSelectorService } from '../../services/period-selector.service';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrl: './expenses.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesComponent {
    public readonly state$: Observable<LoadState>;

    public readonly pieChartData$: Observable<PieChartData>;
    public readonly lineChartData$: Observable<LineChartData>;

    constructor(
        private readonly financeFacade: FinanceFacade,
        private readonly translate: TranslateService,
        private readonly periodService: PeriodSelectorService
    ) {
        this.financeFacade.loadFinanceCategories();
        this.financeFacade.loadFinanceTransactions();

        this.state$ = this.financeFacade.financeTransactions.loadState$;

        this.pieChartData$ = combineLatest([
            this.financeFacade.financeTransactions.expensesTransactions$.pipe(skip(1)),
            this.financeFacade.financeCategories.expensesCategories$.pipe(skip(1))
        ]).pipe(
            map(([transactions, categories]) => ({
                seriesOptions: this.getPieSeriesOptions(transactions, categories)
            }))
        );

        this.lineChartData$ = combineLatest([
            this.financeFacade.financeTransactions.expensesTransactions$.pipe(skip(1)),
            this.periodService.selectedPeriod$
        ]).pipe(
            auditTime(0),
            map(([expenses, period]) => {
                const xAxis: string[] = [];
                if (period.value === 0) {
                    expenses
                        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                        .forEach((transaction) => {
                            const date = transaction.createdAt.toISOString().split('T')[0];
                            xAxis.push(date);
                        });
                } else {
                    for (let i = 0; i < period.value; i++) {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        xAxis.unshift(date.toISOString().split('T')[0]);
                    }
                }

                const data: number[] = [];
                for (let i = 0; i < xAxis.length; i++) {
                    const transactions = expenses.filter(
                        (transaction) => transaction.createdAt.toISOString().split('T')[0] === xAxis[i]
                    );
                    const value = transactions.reduce((acc, transaction) => acc + transaction.value, 0);
                    data.push(value + (data[i - 1] || 0));
                }

                const seriesOptions: SeriesLineOptions[] = [
                    {
                        type: 'line',
                        name: this.translate.instant('Expenses') as string,
                        data
                    }
                ];

                const chartOptions = {
                    xAxis: { categories: xAxis }
                };

                return { seriesOptions, chartOptions };
            })
        );
    }

    private getPieSeriesOptions(transactions: Transaction[], categories: Category[]): SeriesPieOptions[] {
        const data = categories.map((category) => {
            return {
                name: category.name,
                color: category.color,
                y: transactions
                    .filter((transaction) => transaction.categoryId === category.id)
                    .reduce((acc, transaction) => acc + transaction.value, 0)
            };
        });

        return [
            {
                type: 'pie',
                name: this.translate.instant('Expenses by Categories') as string,
                data
            }
        ];
    }
}
