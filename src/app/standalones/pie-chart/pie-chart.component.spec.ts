import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { NbStatusService } from '@nebular/theme';

describe('PieChartComponent', () => {
    let component: PieChartComponent;
    let fixture: ComponentFixture<PieChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PieChartComponent],
            providers: [NbStatusService]
        }).compileComponents();

        fixture = TestBed.createComponent(PieChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
