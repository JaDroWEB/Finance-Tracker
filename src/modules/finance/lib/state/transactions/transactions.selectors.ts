import { financeTransactionsFeature } from './transactions.reducer';

const {
    selectFinanceTransactionsState,
    selectTransactions,
    selectLoadState,
    selectEditState,
    selectDeleteState,
    selectAddState
} = financeTransactionsFeature;

export const finacneTransactionsQuery = {
    selectFinanceTransactionsState,
    selectTransactions,
    selectLoadState,
    selectEditState,
    selectDeleteState,
    selectAddState
};
