import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnChartComponent } from './column-chart.component';
import { NbStatusService } from '@nebular/theme';

describe('ColumnChartComponent', () => {
    let component: ColumnChartComponent;
    let fixture: ComponentFixture<ColumnChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ColumnChartComponent],
            providers: [NbStatusService]
        }).compileComponents();

        fixture = TestBed.createComponent(ColumnChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
