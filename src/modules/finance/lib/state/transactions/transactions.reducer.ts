import { createFeature, createReducer, on } from '@ngrx/store';
import { financeTransactionsActions } from './transactions.actions';
import { TransactionsState } from '../../models/transactions.model';

export const initialState: TransactionsState = {
    loadState: 'beforeLoad',
    editState: 'beforeLoad',
    deleteState: 'beforeLoad',
    addState: 'beforeLoad',
    transactions: []
};

export const financeTransactionsFeature = createFeature({
    name: 'FinanceTransactions',
    reducer: createReducer(
        initialState,
        on(
            financeTransactionsActions.loadFinanceTransactions,
            (state): TransactionsState => ({
                ...state,
                loadState: 'loading'
            })
        ),
        on(
            financeTransactionsActions.loadFinanceTransactionsSuccess,
            (state, { transactions }): TransactionsState => ({
                ...state,
                loadState: 'loaded',
                transactions
            })
        ),
        on(
            financeTransactionsActions.loadFinanceTransactionsError,
            (state): TransactionsState => ({
                ...state,
                loadState: 'error'
            })
        ),
        on(
            financeTransactionsActions.editFinanceTransaction,
            (state): TransactionsState => ({
                ...state,
                editState: 'loading'
            })
        ),
        on(
            financeTransactionsActions.editFinanceTransactionSuccess,
            (state, { transaction }): TransactionsState => ({
                ...state,
                editState: 'loaded',
                transactions: state.transactions.map((t) => (t.id === transaction.id ? transaction : t))
            })
        ),
        on(
            financeTransactionsActions.editFinanceTransactionError,
            (state): TransactionsState => ({
                ...state,
                editState: 'error'
            })
        ),
        on(
            financeTransactionsActions.deleteFinanceTransaction,
            (state): TransactionsState => ({
                ...state,
                deleteState: 'loading'
            })
        ),
        on(
            financeTransactionsActions.deleteFinanceTransactionSuccess,
            (state, { transaction }): TransactionsState => ({
                ...state,
                deleteState: 'loaded',
                transactions: state.transactions.filter((t) => t.id !== transaction.id)
            })
        ),
        on(
            financeTransactionsActions.deleteFinanceTransactionError,
            (state): TransactionsState => ({
                ...state,
                deleteState: 'error'
            })
        ),
        on(
            financeTransactionsActions.addFinanceTransaction,
            (state): TransactionsState => ({
                ...state,
                addState: 'loading'
            })
        ),
        on(
            financeTransactionsActions.addFinanceTransactionSuccess,
            (state, { transaction }): TransactionsState => ({
                ...state,
                addState: 'loaded',
                transactions: [...state.transactions, transaction]
            })
        ),
        on(
            financeTransactionsActions.addFinanceTransactionError,
            (state): TransactionsState => ({
                ...state,
                addState: 'error'
            })
        )
    )
});
