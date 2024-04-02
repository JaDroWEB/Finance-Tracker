import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartComponent } from './line-chart.component';
import { NbStatusService } from '@nebular/theme';

describe('LineChartComponent', () => {
    let component: LineChartComponent;
    let fixture: ComponentFixture<LineChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LineChartComponent],
            providers: [NbStatusService]
        }).compileComponents();

        fixture = TestBed.createComponent(LineChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
