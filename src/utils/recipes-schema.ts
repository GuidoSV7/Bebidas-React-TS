import * as z from "zod";


export const DrinkSchema = z.object({
    "strCategory": z.string(),
});
export type Drink = z.infer<typeof DrinkSchema>;

export const CategoriesApiResponseSchema = z.object({
    "drinks": z.array(DrinkSchema),
});
export type CategoriesApiResponse = z.infer<typeof CategoriesApiResponseSchema>;

export const SearchFilterSchema = z.object({
        ingredient: z.string(),
        category: z.string()
})



export const DrinkAPIResponse = z.object({
    "strDrink": z.string(),
    "strDrinkThumb": z.string(),
    "idDrink": z.string(),
});

export const DrinksAPIResponseSchema = z.object({
    "drinks": z.array(DrinkAPIResponse),
});

export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
  });




