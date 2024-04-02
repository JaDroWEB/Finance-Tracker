import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import {
    NbButtonModule,
    NbCardModule,
    NbDialogRef,
    NbInputModule,
    NbSelectModule,
    NbSpinnerModule
} from '@nebular/theme';
import { Category, CategoryType, FinanceFacade } from '../../../modules/finance/public-api';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-transaction-modal',
    standalone: true,
    imports: [
        NbCardModule,
        AsyncPipe,
        NbInputModule,
        TranslateModule,
        NbSpinnerModule,
        NbButtonModule,
        ReactiveFormsModule,
        NbSelectModule
    ],
    templateUrl: './transaction-modal.component.html',
    styleUrl: './transaction-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionModalComponent implements OnInit {
    public readonly state$ = this.financeFacade.financeTransactions.loadState$;
    public readonly form = new FormGroup({
        createdAt: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl<string | undefined>(''),
        value: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
        categoryId: new FormControl<string>('', { nonNullable: true }),
        id: new FormControl<string>('', { nonNullable: true }),
        type: new FormControl<CategoryType>(CategoryType.EXPENSE, { nonNullable: true })
    });

    public isAdd = false;
    public categories$?: Observable<Category[]>;

    public transactionId: string | undefined;
    public type: CategoryType = CategoryType.EXPENSE;

    constructor(
        @Optional() private dialogRef: NbDialogRef<string>,
        private readonly financeFacade: FinanceFacade
    ) {}

    public ngOnInit(): void {
        if (this.type === CategoryType.INCOME) {
            this.categories$ = this.financeFacade.financeCategories.incomeCategories$;
        } else if (this.type === CategoryType.EXPENSE) {
            this.categories$ = this.financeFacade.financeCategories.expensesCategories$;
        }

        this.form.controls.type.setValue(this.type);

        if (this.transactionId === undefined) {
            this.isAdd = true;
            return;
        }

        this.financeFacade
            .selectTransactionById(this.transactionId)
            .pipe(
                tap((transaction) => {
                    if (transaction) {
                        this.form.patchValue({
                            ...transaction,
                            createdAt: transaction.createdAt.toISOString().split('T')[0]
                        });
                    }
                })
            )
            .subscribe();
    }

    public close(): void {
        this.dialogRef.close();
    }

    public save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.isAdd) {
            this.financeFacade.addFinanceTransaction({
                ...this.form.getRawValue(),
                createdAt: new Date(this.form.getRawValue().createdAt)
            });
        } else {
            this.financeFacade.editFinanceTransaction({
                ...this.form.getRawValue(),
                createdAt: new Date(this.form.getRawValue().createdAt)
            });
        }

        this.dialogRef.close();
    }
}
