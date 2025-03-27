import axios from "axios"
import { CategoriesApiResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { SearchFilter } from "../types"

export async function getCategories()  {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

    const {data} = await axios(url)
    const result = CategoriesApiResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }

}

export async function getRecipes(filters: SearchFilter) {
    const { ingredient, category } = filters
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}&i=${ingredient}`
    const {data} = await axios(url)
    const result = DrinksAPIResponseSchema.safeParse(data)
    console.log(result)
    if (result.success) {
        return result.data
    }

    
}

export async function getRecipeById(id: string) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    console.log(data)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    console.log(result)
    if (result.success) {
        return result.data
    }
}

