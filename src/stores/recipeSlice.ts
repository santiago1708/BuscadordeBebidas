import { SearchFilter, Categories } from './../types/index';
import { StateCreator } from "zustand";
import { getCategories, getRecipes } from "../services/RecipeServices";
import type { DrinksResponse } from "../types";


export type RecipesSliceType = {
    categories: Categories
    drinks: DrinksResponse
    fetCategory: () => Promise<void>
    searchRecipes: (searchfilter: SearchFilter) => Promise<void>
}


export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks : {
        drinks: []
    },
    fetCategory: async () => {
        const categories = await getCategories()
        set(() => ({
            categories
        }))
    },
    searchRecipes: async(filter) => {
        const drinks = await getRecipes(filter)
        set(() => ({
            drinks
        }))

    }
})