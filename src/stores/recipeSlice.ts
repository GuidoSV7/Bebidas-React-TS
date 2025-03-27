import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import { Categories, Drinks, Recipe, SearchFilter } from '../types/index';


export type RecipesSliceType = {
    categories: Categories
    drinks : Drinks
    
    recipeDetails: Recipe
    modal:boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: string) => void
    closeModal: () => void
    
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    
    drinks: {
        drinks: []
    },

    recipeDetails: {} as Recipe,
    
    

    modal:false,

    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },

    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },



    selectRecipe: async (id) => {
        const recipeDetails = await getRecipeById(id)

        
        set({
            recipeDetails,
            modal:true
        })
    },

    closeModal: () => {
        set({
            modal:false,
            recipeDetails: {} as Recipe
        })
    }



})