import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

export interface Period {
    label: string;
    value: number;
}

@Injectable({
    providedIn: 'root'
})
export class PeriodSelectorService {
    public readonly periods: Period[] = [
        { label: 'Last 7 days', value: 7 },
        { label: 'Last 30 days', value: 30 },
        { label: 'Last year', value: 365 },
        { label: 'All time', value: 0 }
    ];

    private selectedPeriod: BehaviorSubject<Period>;
    public readonly selectedPeriod$: Observable<Period>;

    public get selectedPeriodValue(): number {
        return this.selectedPeriod.getValue().value;
    }

    constructor() {
        const savedPeriodValue = localStorage.getItem('selectedPeriodValue');
        const findedPeriod = savedPeriodValue
            ? this.periods.find((p) => p.value === parseInt(savedPeriodValue))
            : this.periods[0];
        this.selectedPeriod = new BehaviorSubject(findedPeriod ? findedPeriod : this.periods[0]);
        this.selectedPeriod$ = this.selectedPeriod
            .asObservable()
            .pipe(distinctUntilChanged((a, b) => a.value === b.value));
    }

    public selectPeriod(periodValue: number): void {
        localStorage.setItem('selectedPeriodValue', periodValue.toString());
        const findedPeriod = this.periods.find((p) => p.value === periodValue);
        if (!findedPeriod) {
            throw new Error('Period not found');
        }
        this.selectedPeriod.next(findedPeriod);
    }
}
