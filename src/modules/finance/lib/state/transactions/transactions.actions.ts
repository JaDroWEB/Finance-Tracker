import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction, TransactionList } from '../../models/transactions.model';

export const financeTransactionsActions = createActionGroup({
    source: 'Finance Transactions',
    events: {
        'Load Finance Transactions': emptyProps(),
        'Load Finance Transactions Success': props<{ transactions: TransactionList }>(),
        'Load Finance Transactions Error': props<{ error: unknown }>(),
        'Edit Finance Transaction': props<{ transaction: Transaction }>(),
        'Edit Finance Transaction Success': props<{ transaction: Transaction }>(),
        'Edit Finance Transaction Error': props<{ error: unknown }>(),
        'Delete Finance Transaction': props<{ transaction: Transaction }>(),
        'Delete Finance Transaction Success': props<{ transaction: Transaction }>(),
        'Delete Finance Transaction Error': props<{ error: unknown }>(),
        'Add Finance Transaction': props<{ transaction: Transaction }>(),
        'Add Finance Transaction Success': props<{ transaction: Transaction }>(),
        'Add Finance Transaction Error': props<{ error: unknown }>()
    }
});
