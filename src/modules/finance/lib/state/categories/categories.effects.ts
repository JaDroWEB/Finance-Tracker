import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { financeCategoriesActions } from './categories.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { FinanceService } from '../../services/finance.service';

@Injectable()
export class FinanceCategoriesEffects {
    public readonly loadFinanceCategories$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(financeCategoriesActions.loadFinanceCategories),
            exhaustMap(() =>
                this.financeService.getFinanceCategories().pipe(
                    map((categories) => financeCategoriesActions.loadFinanceCategoriesSuccess({ categories })),
                    catchError((error: unknown) => of(financeCategoriesActions.loadFinanceCategoriesError({ error })))
                )
            )
        );
    });

    public readonly addFinanceCategories$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(financeCategoriesActions.addFinanceCategory),
            exhaustMap((action) =>
                this.financeService.addFinanceCategory(action.category).pipe(
                    map((category) => financeCategoriesActions.addFinanceCategorySuccess({ category })),
                    catchError((error: unknown) => of(financeCategoriesActions.addFinanceCategoryError({ error })))
                )
            )
        );
    });

    constructor(
        private readonly actions$: Actions,
        private financeService: FinanceService
    ) {}
}
