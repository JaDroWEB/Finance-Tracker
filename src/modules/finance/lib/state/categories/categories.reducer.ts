import { createFeature, createReducer, on } from '@ngrx/store';
import { financeCategoriesActions } from './categories.actions';
import { CategoriesState } from '../../models/categories.model';

export const initialState: CategoriesState = {
    loadState: 'beforeLoad',
    addState: 'beforeLoad',
    deleteState: 'beforeLoad',
    editState: 'beforeLoad',
    categories: []
};

export const financeCategoriesFeature = createFeature({
    name: 'FinanceCategories',
    reducer: createReducer(
        initialState,
        on(
            financeCategoriesActions.loadFinanceCategories,
            (state): CategoriesState => ({
                ...state,
                loadState: 'loading'
            })
        ),
        on(
            financeCategoriesActions.loadFinanceCategoriesSuccess,
            (state, { categories }): CategoriesState => ({
                ...state,
                loadState: 'loaded',
                categories
            })
        ),
        on(
            financeCategoriesActions.loadFinanceCategoriesError,
            (state): CategoriesState => ({
                ...state,
                loadState: 'error'
            })
        ),
        on(
            financeCategoriesActions.addFinanceCategory,
            (state): CategoriesState => ({
                ...state,
                addState: 'loading'
            })
        ),
        on(
            financeCategoriesActions.addFinanceCategorySuccess,
            (state, { category }): CategoriesState => ({
                ...state,
                addState: 'loaded',
                categories: [...state.categories, category]
            })
        ),
        on(
            financeCategoriesActions.addFinanceCategoryError,
            (state): CategoriesState => ({
                ...state,
                addState: 'error'
            })
        )
    )
});
