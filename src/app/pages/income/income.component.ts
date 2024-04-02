import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SeriesLineOptions, SeriesPieOptions } from 'highcharts';
import { Observable, combineLatest, skip, map, auditTime } from 'rxjs';
import { LoadState, FinanceFacade, Transaction, Category } from '../../../modules/finance/public-api';
import { PeriodSelectorService } from '../../services/period-selector.service';
import { LineChartData } from '../../standalones/line-chart/line-chart.component';
import { PieChartData } from '../../standalones/pie-chart/pie-chart.component';

@Component({
    selector: 'app-income',
    templateUrl: './income.component.html',
    styleUrl: './income.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomeComponent {
    public readonly pieChartData$: Observable<PieChartData>;
    public readonly pieChartState$: Observable<LoadState>;

    public readonly lineChartData$: Observable<LineChartData>;
    public readonly lineChartState$: Observable<LoadState>;

    constructor(
        private readonly financeFacade: FinanceFacade,
        private readonly translate: TranslateService,
        private readonly periodService: PeriodSelectorService
    ) {
        this.financeFacade.loadFinanceCategories();
        this.financeFacade.loadFinanceTransactions();

        this.pieChartState$ = this.financeFacade.financeTransactions.loadState$;
        this.lineChartState$ = this.financeFacade.financeTransactions.loadState$;

        this.pieChartData$ = combineLatest([
            this.financeFacade.financeTransactions.incomeTransactions$.pipe(skip(1)),
            this.financeFacade.financeCategories.incomeCategories$.pipe(skip(1))
        ]).pipe(
            map(([transactions, categories]) => ({
                seriesOptions: this.getPieSeriesOptions(transactions, categories)
            }))
        );

        this.lineChartData$ = combineLatest([
            this.financeFacade.financeTransactions.incomeTransactions$.pipe(skip(1)),
            this.periodService.selectedPeriod$
        ]).pipe(
            auditTime(0),
            map(([incomes, period]) => {
                const xAxis: string[] = [];
                if (period.value === 0) {
                    incomes
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
                    const transactions = incomes.filter(
                        (transaction) => transaction.createdAt.toISOString().split('T')[0] === xAxis[i]
                    );
                    const value = transactions.reduce((acc, transaction) => acc + transaction.value, 0);
                    data.push(value + (data[i - 1] || 0));
                }

                const seriesOptions: SeriesLineOptions[] = [
                    {
                        type: 'line',
                        name: this.translate.instant('Incomes') as string,
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
                name: this.translate.instant('Incomes by Categories') as string,
                data
            }
        ];
    }
}
