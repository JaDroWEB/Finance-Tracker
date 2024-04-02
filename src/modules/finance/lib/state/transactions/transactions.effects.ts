import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { FinanceService } from '../../services/finance.service';
import { financeTransactionsActions } from './transactions.actions';

@Injectable()
export class FinanceTransactionsEffects {
    public readonly loadFinanceTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(financeTransactionsActions.loadFinanceTransactions),
            exhaustMap(() => {
                return this.financeService.getFinanceTransactions().pipe(
                    map((transactions) => financeTransactionsActions.loadFinanceTransactionsSuccess({ transactions })),
                    catchError((error: unknown) =>
                        of(financeTransactionsActions.loadFinanceTransactionsError({ error }))
                    )
                );
            })
        );
    });

    public readonly editFinanceTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(financeTransactionsActions.editFinanceTransaction),
            exhaustMap((action) => {
                return this.financeService.editFinanceTransaction(action.transaction).pipe(
                    map((transaction) => financeTransactionsActions.editFinanceTransactionSuccess({ transaction })),
                    catchError((error: unknown) =>
                        of(financeTransactionsActions.editFinanceTransactionError({ error }))
                    )
                );
            })
        );
    });

    public readonly deleteFinanceTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(financeTransactionsActions.deleteFinanceTransaction),
            exhaustMap((action) => {
                return this.financeService.deleteFinanceTransaction(action.transaction).pipe(
                    map((transaction) => financeTransactionsActions.deleteFinanceTransactionSuccess({ transaction })),
                    catchError((error: unknown) =>
                        of(financeTransactionsActions.deleteFinanceTransactionError({ error }))
                    )
                );
            })
        );
    });

    public readonly addFinanceTransactions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(financeTransactionsActions.addFinanceTransaction),
            exhaustMap((action) => {
                return this.financeService.addFinanceTransaction(action.transaction).pipe(
                    map((transaction) => financeTransactionsActions.addFinanceTransactionSuccess({ transaction })),
                    catchError((error: unknown) => of(financeTransactionsActions.addFinanceTransactionError({ error })))
                );
            })
        );
    });

    constructor(
        private readonly actions$: Actions,
        private financeService: FinanceService
    ) {}
}
