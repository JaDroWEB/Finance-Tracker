import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Category, CategoryList } from '../models/categories.model';
import { Observable, ReplaySubject, map, share, timer } from 'rxjs';
import { categoryDtoSchema, categoryListDtoSchema } from '../dto/categories.dto';
import { ZodType } from 'zod';
import { Transaction, TransactionList } from '../models/transactions.model';
import { transactionDtoSchema, transactionListDtoSchema } from '../dto/transactions.dto';

const CACHE_TIMEOUT = 1000 * 60 * 5;

@Injectable({
    providedIn: 'root'
})
export class FinanceService {
    constructor(private readonly httpClient: HttpClient) {}

    public getFinanceCategories(): Observable<CategoryList> {
        return this.httpClient.get<CategoryList>(environment.apiUrl + 'categories').pipe(
            map((response) => this.checkSchema(response, categoryListDtoSchema)),
            share({
                connector: () => new ReplaySubject(1),
                resetOnComplete: () => timer(CACHE_TIMEOUT)
            })
        );
    }

    public getFinanceTransactions(): Observable<TransactionList> {
        return this.httpClient.get<TransactionList>(environment.apiUrl + 'transactions').pipe(
            map((response) => this.checkSchema(response, transactionListDtoSchema)),
            share({
                connector: () => new ReplaySubject(1),
                resetOnComplete: () => timer(CACHE_TIMEOUT)
            })
        );
    }

    public editFinanceTransaction(transaction: Transaction): Observable<Transaction> {
        return this.httpClient
            .put<Transaction>(
                environment.apiUrl + 'categories/' + transaction.categoryId + '/transactions/' + transaction.id,
                transaction
            )
            .pipe(map((response) => this.checkSchema(response, transactionDtoSchema)));
    }

    public deleteFinanceTransaction(transaction: Transaction): Observable<Transaction> {
        return this.httpClient
            .delete<Transaction>(
                environment.apiUrl + 'categories/' + transaction.categoryId + '/transactions/' + transaction.id
            )
            .pipe(map((response) => this.checkSchema(response, transactionDtoSchema)));
    }

    public addFinanceTransaction(transaction: Transaction): Observable<Transaction> {
        return this.httpClient
            .post<Transaction>(
                environment.apiUrl + 'categories/' + transaction.categoryId + '/transactions',
                transaction
            )
            .pipe(map((response) => this.checkSchema(response, transactionDtoSchema)));
    }

    public addFinanceCategory(category: Category): Observable<Category> {
        return this.httpClient
            .post<Category>(environment.apiUrl + 'categories', category)
            .pipe(map((response) => this.checkSchema(response, categoryDtoSchema)));
    }

    private checkSchema<T, U extends ZodType<T>>(data: T, schema: U): T {
        const parseResult = schema.safeParse(data);
        if (parseResult.success) {
            return parseResult.data;
        } else {
            console.error('Invalid response', parseResult.error);
            throw new Error('Invalid response', parseResult.error);
        }
    }
}
