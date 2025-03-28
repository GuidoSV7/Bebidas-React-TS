import { z } from "zod";
import { CategoriesApiResponseSchema, DrinkAPIResponse, DrinksAPIResponseSchema, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipes-schema";

export type Categories = z.infer<typeof CategoriesApiResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>;
export type Drink = z.infer<typeof DrinkAPIResponse>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;