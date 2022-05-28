import {
  UPDATE_RECIPE_NAME,
  UPDATE_RECIPE_DESCRIPTION,
  UPDATE_RECIPE_SERVES,
  UPDATE_RECIPE_CUISINE,
  UPDATE_RECIPE_COOKTIME,
  UPDATE_RECIPE_FROM,
  ADD_INGREDIENT_INPUT,
  UPDATE_INGREDIENT_AMOUNT,
  UPDATE_INGREDIENT_UNIT,
  UPDATE_INGREDIENT_NAME,
  REMOVE_INGREDIENT,
  initRecipeState,
  SET_INGREDIENT_TO_ZERO,
  SET_RECIPE_TO_ZERO,
} from './actions';

export default function recipeReducer(state, action) {
  switch (action.type) {
    case UPDATE_RECIPE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case UPDATE_RECIPE_DESCRIPTION: {
      return {
        ...state,
        description: action.payload,
      };
    }
    case UPDATE_RECIPE_SERVES: {
      return {
        ...state,
        serves: action.payload,
      };
    }
    case UPDATE_RECIPE_CUISINE: {
      return {
        ...state,
        cuisine: action.payload,
      };
    }
    case UPDATE_RECIPE_COOKTIME: {
      return {
        ...state,
        cookTime: action.payload,
      };
    }
    case UPDATE_RECIPE_FROM: {
      return {
        ...state,
        from: action.payload,
      };
    }
    case ADD_INGREDIENT_INPUT: {
      return {
        ...state,
        ingredients: [...state.ingredients, initRecipeState],
      };
    }
    case UPDATE_INGREDIENT_AMOUNT: {
      const ingreeds = state.ingredients;
      ingreeds[action.payload.idx].a = action.payload.value;

      return {
        ...state,
        ingredients: ingreeds,
      };
    }
    case UPDATE_INGREDIENT_UNIT: {
      const ingreeds = state.ingredients;
      ingreeds[action.payload.idx].u = action.payload.value;

      return {
        ...state,
        ingredients: ingreeds,
      };
    }
    case UPDATE_INGREDIENT_NAME: {
      const ingreeds = state.ingredients;
      ingreeds[action.payload.idx].i = action.payload.value;

      return {
        ...state,
        ingredients: ingreeds,
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingreed, idx) => action.payload !== idx
        ),
      };
    }
    case SET_INGREDIENT_TO_ZERO: {
      return {
        ...state,
        ingredients: [{ a: '', u: '', i: '' }],
      };
    }
    case SET_RECIPE_TO_ZERO: {
      return initRecipeState;
    }
    default: {
      return state;
    }
  }
}
