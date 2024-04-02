import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Options, SeriesColumnOptions } from 'highcharts';
import { LoadState } from '../../../modules/finance/public-api';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Chart, ChartModule } from 'angular-highcharts';
import Accessibility from 'highcharts/modules/accessibility';
import Highcharts from 'highcharts';
import { first } from 'rxjs';
Accessibility(Highcharts);

export interface ColumnChartData {
    seriesOptions: SeriesColumnOptions[];
    chartOptions?: Options;
}

@Component({
    selector: 'app-column-chart',
    standalone: true,
    imports: [ChartModule, NbCardModule, TranslateModule, NbSpinnerModule],
    templateUrl: './column-chart.component.html',
    styleUrl: './column-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartComponent {
    private readonly defaultOptions: Options = {
        chart: {
            type: 'column',
            height: '250px'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            crosshair: true
        },
        title: {
            text: undefined
        },
        yAxis: {
            title: {
                text: null
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.x}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{point.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} €</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                groupPadding: 0.05
            },
            series: {
                animation: false
            }
        }
    };

    public chart?: Chart;
    public readonly loadState = signal<LoadState>('beforeLoad');

    @Input({ required: true })
    public set chartData(value: ColumnChartData | null) {
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
                    chart.update(value.chartOptions, true, true);
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
