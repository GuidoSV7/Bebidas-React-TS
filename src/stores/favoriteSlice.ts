import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificacionSlice"



export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    existFavorite: (id:string) => boolean,
    loadFromStorage : () => void

}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & NotificationSliceType , [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],

    handleClickFavorite: (recipe) => {

        const favorites = get().favorites 

        if(favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {
            set({
                favorites: favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })
            createNotificationSlice(set,get,api).showNotificacion({ 
                text: 'Receta eliminada de favoritos',
                error: false
               })

        } else {
            set({
                favorites: [...favorites, recipe]
            })

            createNotificationSlice(set,get,api).showNotificacion({ 
                text: 'Se agregó a Favoritos',
                error: false
               })
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites))

       

        
    },

    existFavorite: (id) => {
        const favorites = get().favorites
        return favorites.some(favorite => favorite.idDrink === id)
    },

    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
    }}

})