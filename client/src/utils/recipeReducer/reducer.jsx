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
  SET_INGREDIENT_TO_ZERO,
  SET_RECIPE_TO_ZERO,
  ADD_INSTRUCTION_INPUT,
  UPDATE_INSTRUCTION,
  REMOVE_INSTRUCTION,
  SET_INSTRUCTION_TO_ZERO,
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
        ingredients: [
          ...state.ingredients,
          {
            amount: '',
            unit: '',
            name: '',
          },
        ],
      };
    }
    case UPDATE_INGREDIENT_AMOUNT: {
      const ingreeds = state.ingredients;
      ingreeds[action.payload.idx].amount = parseInt(action.payload.value);

      return {
        ...state,
        ingredients: ingreeds,
      };
    }
    case UPDATE_INGREDIENT_UNIT: {
      const ingreeds = state.ingredients;
      ingreeds[action.payload.idx].unit = action.payload.value;

      return {
        ...state,
        ingredients: ingreeds,
      };
    }
    case UPDATE_INGREDIENT_NAME: {
      const ingreeds = state.ingredients;
      ingreeds[action.payload.idx].name = action.payload.value;

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
        ingredients: [{ amount: '', unit: '', name: '' }],
      };
    }
    case ADD_INSTRUCTION_INPUT: {
      return {
        ...state,
        instructions: [...state.instructions, ''],
      };
    }
    case UPDATE_INSTRUCTION: {
      const instructs = state.instructions;
      instructs[action.payload.idx] = action.payload.value;

      return {
        ...state,
        instructions: instructs,
      };
    }
    case REMOVE_INSTRUCTION: {
      return {
        ...state,
        instructions: state.instructions.filter(
          (instruct, idx) => action.payload !== idx
        ),
      };
    }
    case SET_INSTRUCTION_TO_ZERO: {
      return {
        ...state,
        instructions: [''],
      };
    }
    case SET_RECIPE_TO_ZERO: {
      return {
        name: '',
        description: '',
        serves: '',
        ingredients: [
          {
            amount: '',
            unit: '',
            name: '',
          },
        ],
        instructions: [''],
        from: '',
        cuisine: '',
        cookTime: '',
      };
    }
    default: {
      return state;
    }
  }
}
