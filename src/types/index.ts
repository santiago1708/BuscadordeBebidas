import {z} from 'zod'
import { CategoriesAPIResponseSchema } from '../Schemas/recipes-schemas'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>