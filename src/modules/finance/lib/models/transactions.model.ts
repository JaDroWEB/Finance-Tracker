import { z } from 'zod';
import { LoadState } from './load-state';
import { transactionDtoSchema, transactionListDtoSchema } from '../dto/transactions.dto';

export interface TransactionsState {
    loadState: LoadState;
    editState: LoadState;
    deleteState: LoadState;
    addState: LoadState;
    transactions: TransactionList;
}

export type Transaction = z.infer<typeof transactionDtoSchema>;
export type TransactionList = z.infer<typeof transactionListDtoSchema>;
