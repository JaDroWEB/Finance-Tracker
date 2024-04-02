import { financeCategoriesFeature } from './categories.reducer';

const {
    selectCategories,
    selectFinanceCategoriesState,
    selectLoadState,
    selectAddState,
    selectDeleteState,
    selectEditState
} = financeCategoriesFeature;

export const finacneCategoriesQuery = {
    selectLoadState,
    selectCategories,
    selectFinanceCategoriesState,
    selectAddState,
    selectDeleteState,
    selectEditState
};
