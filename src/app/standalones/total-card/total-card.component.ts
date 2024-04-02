import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { LoadState } from '../../../modules/finance/public-api';

@Component({
    selector: 'app-total-card',
    standalone: true,
    imports: [NbCardModule, TranslateModule, NbSpinnerModule],
    templateUrl: './total-card.component.html',
    styleUrl: './total-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalCardComponent {
    public readonly loadState = signal<LoadState>('beforeLoad');

    @Input({ required: true })
    public title: string = '';

    @Input({ required: true })
    public value: string | null = null;

    @Input({ required: true })
    public set state(value: LoadState | null) {
        if (value) {
            this.loadState.set(value);
        }
    }
}
