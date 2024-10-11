import { StateCreator } from "zustand";
import { DrinkRecipe } from "../types";


export type FavoritesSliceType = {
    favorites: DrinkRecipe[]
    handleCliclFavorite: (Drink: DrinkRecipe) => void
    favoriteExist: (id: DrinkRecipe['idDrink']) => boolean
}

export const createFavoriteSlice : StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites : [], 
    handleCliclFavorite : (Drink) => {
        if(get().favoriteExist(Drink.idDrink)) {
            set(state => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink!== Drink.idDrink)
            }));
        }else {
            set(state => ({
                favorites: [...state.favorites, Drink]
            }));
        }
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    }
})