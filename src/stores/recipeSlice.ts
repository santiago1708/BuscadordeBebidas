import { SearchFilter, Categories } from './../types/index';
import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeServices";
import type { Drink, DrinkRecipe, DrinksResponse } from "../types";
import { FavoritesSliceType } from './favoriteSlice';


export type RecipesSliceType = {
    categories: Categories
    drinks: DrinksResponse
    drinkRecipe: DrinkRecipe
    modal: boolean
    fetCategory: () => Promise<void>
    searchRecipes: (searchfilter: SearchFilter) => Promise<void>
    selectRecipe: (id : Drink['idDrink']) => Promise<void>
    closeModal: () => void
}


export const createRecipesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [] , [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks : {
        drinks: []
    },
    drinkRecipe: {} as DrinkRecipe
    ,
    modal: false,
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

    },
    selectRecipe: async(id) => {
        const drinkRecipe = await getRecipeById(id);
        set(() => ({
            drinkRecipe,
            modal:true
        }))
    },
    closeModal: () => {
        set(() => ({
            modal : false,
            drinkRecipe: {} as DrinkRecipe
        }))
    }
})