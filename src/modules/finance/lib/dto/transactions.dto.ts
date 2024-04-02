import { z } from 'zod';
import { CategoryType } from '../models/categories.model';

export const transactionDtoSchema = z.object({
    id: z.string(),
    categoryId: z.string(),
    createdAt: z.coerce.date(),
    name: z.string(),
    description: z.string().nullish(),
    value: z.number(),
    user: z.string().nullish(),
    type: z.nativeEnum(CategoryType)
});

export const transactionListDtoSchema = z.array(transactionDtoSchema);
