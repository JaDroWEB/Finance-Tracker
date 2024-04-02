import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { Options, SeriesLineOptions } from 'highcharts';
import { LoadState } from '../../../modules/finance/public-api';
import Accessibility from 'highcharts/modules/accessibility';
import Highcharts from 'highcharts';
import { first } from 'rxjs';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
Accessibility(Highcharts);

export interface LineChartData {
    seriesOptions: SeriesLineOptions[];
    chartOptions?: Options;
}

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [ChartModule, NbCardModule, TranslateModule, NbSpinnerModule],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent {
    private readonly defaultOptions: Options = {
        chart: {
            type: 'spline',
            height: '250px'
        },
        title: undefined,
        xAxis: {
            type: 'datetime',
            crosshair: {
                snap: false
            }
        },
        yAxis: {
            title: {
                text: `<div class="highcharts-color-0" style="height: 2px; width: 140px">
          <svg>
            <rect width="150" height="1"/>
          </svg>
        </div>`,
                useHTML: true
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.2f}€</b><br/>'
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                linecap: 'square'
            },
            series: {
                animation: false,
                shadow: false,
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            radius: 2
                        }
                    }
                }
            }
        }
    };

    public chart?: Chart;
    public readonly loadState = signal<LoadState>('beforeLoad');

    @Input({ required: true })
    public set chartData(value: LineChartData | null) {
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
