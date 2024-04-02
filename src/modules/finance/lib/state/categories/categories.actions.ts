import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category, CategoryList } from '../../models/categories.model';

export const financeCategoriesActions = createActionGroup({
    source: 'Finance Categories',
    events: {
        'Load Finance Categories': emptyProps(),
        'Load Finance Categories Success': props<{ categories: CategoryList }>(),
        'Load Finance Categories Error': props<{ error: unknown }>(),
        'Add Finance Category': props<{ category: Category }>(),
        'Add Finance Category Success': props<{ category: Category }>(),
        'Add Finance Category Error': props<{ error: unknown }>()
    }
});
