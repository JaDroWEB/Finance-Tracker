import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModalComponent } from './transaction-modal.component';
import { NbDialogModule, NbStatusService } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('TransactionModalComponent', () => {
    let component: TransactionModalComponent;
    let fixture: ComponentFixture<TransactionModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TransactionModalComponent,
                NbDialogModule.forRoot(),
                StoreModule.forRoot({}, {}),
                EffectsModule.forRoot()
            ],
            providers: [NbStatusService]
        }).compileComponents();

        fixture = TestBed.createComponent(TransactionModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
