import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryType, FinanceFacade, Transaction } from '../../../../modules/finance/public-api';
import { NbDialogService } from '@nebular/theme';
import { TransactionModalComponent } from '../../../standalones/transaction-modal/transaction-modal.component';
import { Observable, combineLatest, map } from 'rxjs';
import { AddCategoryModalComponent } from '../../../standalones/add-category-modal/add-category-modal.component';

@Component({
    selector: 'app-expenses-table',
    templateUrl: './expenses-table.component.html',
    styleUrl: './expenses-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesTableComponent {
    public readonly state$ = this.financeFacade.financeTransactions.loadState$;
    public readonly expenses$: Observable<(Transaction & { category: string })[]>;

    constructor(
        private readonly financeFacade: FinanceFacade,
        private readonly dialogService: NbDialogService
    ) {
        this.expenses$ = combineLatest([
            this.financeFacade.financeTransactions.expensesTransactions$,
            this.financeFacade.financeCategories.expensesCategories$
        ]).pipe(
            map(([transactions, categories]) =>
                transactions
                    .map((transaction) => ({
                        ...transaction,
                        category: categories.find((category) => category.id === transaction.categoryId)?.name ?? ''
                    }))
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            )
        );
    }

    public openEditTransactionDialog(transactionId: string): void {
        this.dialogService.open(TransactionModalComponent, {
            context: {
                transactionId,
                type: CategoryType.EXPENSE
            }
        });
    }

    public deleteTransaction(transaction: Transaction): void {
        this.financeFacade.deleteFinanceTransaction(transaction);
    }

    public addTransaction(): void {
        this.dialogService.open(TransactionModalComponent, { context: { type: CategoryType.EXPENSE } });
    }

    public addCategory(): void {
        this.dialogService.open(AddCategoryModalComponent, { context: { type: CategoryType.EXPENSE } });
    }
}
