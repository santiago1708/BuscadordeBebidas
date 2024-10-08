import {z} from 'zod'
import { CategoriesAPIResponseSchema, SearchFIlterSchema } from '../Schemas/recipes-schemas'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

export type SearchFilter = z.infer<typeof SearchFIlterSchema>