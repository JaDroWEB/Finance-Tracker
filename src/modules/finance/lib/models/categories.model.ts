import { z } from 'zod';
import { categoryDtoSchema, categoryListDtoSchema } from '../dto/categories.dto';
import { LoadState } from './load-state';

export interface CategoriesState {
    loadState: LoadState;
    addState: LoadState;
    deleteState: LoadState;
    editState: LoadState;
    categories: CategoryList;
}

export enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export type Category = z.infer<typeof categoryDtoSchema>;
export type CategoryList = z.infer<typeof categoryListDtoSchema>;
