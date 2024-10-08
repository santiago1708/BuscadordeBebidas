import { StateCreator } from "zustand"
import { getCategories } from "../services/RecipeServices"
import type { Categories } from "../types"


export type RecipesSliceType = {
    categories: Categories
    fetCategory: () => Promise<void>
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
    }
})