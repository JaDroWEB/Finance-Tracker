import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { Options, SeriesPieOptions } from 'highcharts';
import { LoadState } from '../../../modules/finance/public-api';
import Accessibility from 'highcharts/modules/accessibility';
import Highcharts from 'highcharts';
import { first } from 'rxjs';
Accessibility(Highcharts);

export interface PieChartData {
    seriesOptions: SeriesPieOptions[];
    chartOptions?: Options;
}

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [ChartModule, NbCardModule, TranslateModule, NbSpinnerModule],
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent {
    private readonly defaultOptions: Options = {
        chart: {
            margin: [0, 0, 0, 0],
            type: 'pie',
            height: '250px'
        },
        tooltip: {
            pointFormat: `Percentage: <b>{point.percentage:.1f}%</b><br>Value: <b>{point.y}€</b>`
        },
        credits: {
            enabled: false
        },
        title: {
            text: undefined
        },
        plotOptions: {
            pie: {
                startAngle: 180,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                }
            }
        }
    };

    public chart?: Chart;
    public readonly loadState = signal<LoadState>('beforeLoad');

    @Input({ required: true })
    public set chartData(value: PieChartData | null) {
        if (!value) {
            return;
        }
        if (!this.chart) {
            this.chart = new Chart({ ...this.defaultOptions, ...value.chartOptions });
            value.seriesOptions.forEach((serie) => this.chart?.addSeries(serie, true, true));
        } else {
            this.chart.ref$.pipe(first()).subscribe((chart) => {
                chart.series.forEach((serie) => {
                    const updatedSerie = value.seriesOptions.find((s) => s.name === serie.name);
                    if (updatedSerie) {
                        serie.update(updatedSerie, true);
                    }
                });

                if (value.chartOptions) {
                    chart.update(value.chartOptions);
                }
            });
        }
    }

    @Input({ required: true })
    public set state(value: LoadState | null) {
        if (value) {
            this.loadState.set(value);
        }
    }

    @Input({ required: true })
    public title: string = '';
}
