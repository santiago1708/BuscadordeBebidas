import { StateCreator } from "zustand";
import { DrinkRecipe } from "../types";
import { RecipesSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";


export type FavoritesSliceType = {
    favorites: DrinkRecipe[]
    handleCliclFavorite: (Drink: DrinkRecipe) => void
    favoriteExist: (id: DrinkRecipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoriteSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites : [], 
    handleCliclFavorite : (Drink) => {
        if(get().favoriteExist(Drink.idDrink)) {
            set(state => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink!== Drink.idDrink)
            }));
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se elimino de Favoritos',
                error: false
            })
        }else {
            set(state => ({
                favorites: [...state.favorites, Drink]
            }));
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agrego a Favoritos',
                error: false
            })
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storadFavorites = localStorage.getItem('favorites')
        if(storadFavorites) {
            set({
                favorites: JSON.parse(storadFavorites)
            })
        }
    }
})