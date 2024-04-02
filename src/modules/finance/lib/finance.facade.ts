import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finacneCategoriesQuery } from './state/categories/categories.selectors';
import { financeCategoriesActions } from './state/categories/categories.actions';
import { finacneTransactionsQuery } from './state/transactions/transactions.selectors';
import { financeTransactionsActions } from './state/transactions/transactions.actions';
import { map } from 'rxjs/operators';
import { Category, CategoryType } from './models/categories.model';
import { PeriodSelectorService } from '../../../app/services/period-selector.service';
import { Observable, combineLatest } from 'rxjs';
import { Transaction } from '../public-api';

@Injectable({
    providedIn: 'root'
})
export class FinanceFacade {
    public readonly financeCategories = {
        loadState$: this.store.select(finacneCategoriesQuery.selectLoadState),
        financeCategoriesState$: this.store.select(finacneCategoriesQuery.selectFinanceCategoriesState),
        categories$: this.store.select(finacneCategoriesQuery.selectCategories),
        expensesCategories$: this.store
            .select(finacneCategoriesQuery.selectCategories)
            .pipe(map((categories) => categories.filter((category) => category.type === CategoryType.EXPENSE))),
        incomeCategories$: this.store
            .select(finacneCategoriesQuery.selectCategories)
            .pipe(map((categories) => categories.filter((category) => category.type === CategoryType.INCOME)))
    };

    public readonly financeTransactions = {
        loadState$: this.store.select(finacneTransactionsQuery.selectLoadState),
        financeTransactionsState$: this.store.select(finacneTransactionsQuery.selectFinanceTransactionsState),
        transactions$: combineLatest([
            this.store.select(finacneTransactionsQuery.selectTransactions),
            this.periodService.selectedPeriod$
        ]).pipe(
            map(([transactions, period]) =>
                transactions.filter((transaction) => this.compareDates(transaction.createdAt, period.value))
            )
        ),
        expensesTransactions$: combineLatest([
            this.store.select(finacneTransactionsQuery.selectTransactions),
            this.periodService.selectedPeriod$
        ]).pipe(
            map(([transactions, period]) =>
                transactions.filter(
                    (transaction) =>
                        transaction.type === CategoryType.EXPENSE &&
                        this.compareDates(transaction.createdAt, period.value)
                )
            )
        ),
        incomeTransactions$: combineLatest([
            this.store.select(finacneTransactionsQuery.selectTransactions),
            this.periodService.selectedPeriod$
        ]).pipe(
            map(([transactions, period]) =>
                transactions.filter(
                    (transaction) =>
                        transaction.type === CategoryType.INCOME &&
                        this.compareDates(transaction.createdAt, period.value)
                )
            )
        )
    };

    constructor(
        private readonly store: Store,
        private readonly periodService: PeriodSelectorService
    ) {}

    public loadFinanceCategories(): void {
        this.store.dispatch(financeCategoriesActions.loadFinanceCategories());
    }

    public loadFinanceTransactions(): void {
        this.store.dispatch(financeTransactionsActions.loadFinanceTransactions());
    }

    public editFinanceTransaction(transaction: Transaction): void {
        this.store.dispatch(financeTransactionsActions.editFinanceTransaction({ transaction }));
    }

    public deleteFinanceTransaction(transaction: Transaction): void {
        this.store.dispatch(financeTransactionsActions.deleteFinanceTransaction({ transaction }));
    }

    public addFinanceTransaction(transaction: Transaction): void {
        this.store.dispatch(financeTransactionsActions.addFinanceTransaction({ transaction }));
    }

    public addFinanceCategory(category: Category): void {
        this.store.dispatch(financeCategoriesActions.addFinanceCategory({ category }));
    }

    public selectTransactionById(transactionId: string): Observable<Transaction | undefined> {
        return this.financeTransactions.transactions$.pipe(
            map((transactions) => transactions.find((transaction) => transaction.id === transactionId))
        );
    }

    public compareDates(date: Date, periodValue: number): boolean {
        if (periodValue === 0) {
            return true;
        }
        const currentDate = new Date();
        const periodDate = new Date(currentDate);
        periodDate.setDate(periodDate.getDate() - periodValue);
        return date >= periodDate && date <= currentDate;
    }
}
