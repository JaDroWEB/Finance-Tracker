import { z } from 'zod';
import { CategoryType } from '../models/categories.model';

export const categoryDtoSchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
    name: z.string(),
    color: z.string(),
    type: z.nativeEnum(CategoryType)
});

export const categoryListDtoSchema = z.array(categoryDtoSchema);
