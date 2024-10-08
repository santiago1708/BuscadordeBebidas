import { SearchFilter } from './../types/index';
import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeServices"
import type { Categories } from "../types"


export type RecipesSliceType = {
    categories: Categories
    fetCategory: () => Promise<void>
    searchRecipes: (searchfilter: SearchFilter) => Promise<void>
}


export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    fetCategory: async () => {
        const categories = await getCategories()
        set(() => ({
            categories
        }))
    },
    searchRecipes: async(filter) => {
        await getRecipes(filter)
    }
})