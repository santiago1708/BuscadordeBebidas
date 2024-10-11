import {z} from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema, SearchFIlterSchema } from '../Schemas/recipes-schemas'
export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof SearchFIlterSchema>
export type DrinksResponse = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type DrinkRecipe = z.infer<typeof RecipeAPIResponseSchema>