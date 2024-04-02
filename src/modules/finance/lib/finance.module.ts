import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { financeCategoriesFeature } from './state/categories/categories.reducer';
import { financeTransactionsFeature } from './state/transactions/transactions.reducer';
import { FinanceCategoriesEffects } from './state/categories/categories.effects';
import { FinanceTransactionsEffects } from './state/transactions/transactions.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(financeCategoriesFeature),
        StoreModule.forFeature(financeTransactionsFeature),
        EffectsModule.forFeature([FinanceCategoriesEffects, FinanceTransactionsEffects])
    ]
})
export class FinanceModule {}
