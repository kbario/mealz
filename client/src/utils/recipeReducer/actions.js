export const UPDATE_RECIPE_NAME = 'UPDATE_RECIPE_NAME';
export const UPDATE_RECIPE_DESCRIPTION = 'UPDATE_RECIPE_DESCRIPTION';
export const UPDATE_RECIPE_SERVES = 'UPDATE_RECIPE_SERVES';
export const UPDATE_RECIPE_CUISINE = 'UPDATE_RECIPE_CUISINE';
export const UPDATE_RECIPE_COOKTIME = 'UPDATE_RECIPE_COOKTIME';
export const UPDATE_RECIPE_FROM = 'UPDATE_RECIPE_FROM';

export const ADD_INGREDIENT_INPUT = 'ADD_INGREDIENT_INPUT';
export const UPDATE_INGREDIENT_AMOUNT = 'UPDATE_INGREDIENT_AMOUNT';
export const UPDATE_INGREDIENT_UNIT = 'UPDATE_INGREDIENT_UNIT';
export const UPDATE_INGREDIENT_NAME = 'UPDATE_INGREDIENT_NAME';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENT_TO_ZERO = 'SET_INGREDIENT_TO_ZERO';
export const SET_RECIPE_TO_ZERO = 'SET_RECIPE_TO_ZERO';

export const initRecipeState = {
  name: '',
  description: '',
  serves: '',
  ingredients: [
    {
      a: '',
      u: '',
      i: '',
    },
  ],
  from: '',
  cuisine: '',
  cookTime: '',
};
