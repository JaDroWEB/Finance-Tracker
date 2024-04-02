import { TestBed } from '@angular/core/testing';

import { PeriodSelectorService } from './period-selector.service';

describe('PeriodSelectorService', () => {
    let service: PeriodSelectorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PeriodSelectorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
