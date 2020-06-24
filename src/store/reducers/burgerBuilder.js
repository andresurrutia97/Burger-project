import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.7,
  meat: 1.3
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const newIngredients__Add = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, newIngredients__Add);
};

const removeIngredient = (state, action) => {
  const updatedIngredient2 = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngredients2 = updateObject(
    state.ingredients,
    updatedIngredient2
  );
  const newIngredients__Remove = {
    ingredients: updatedIngredients2,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, newIngredients__Remove);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngredientsFail = state => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Agregar ingredientes
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    //Eliminar ingrediente
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    //Inicializar ingredientes
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    //Manejo de error
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return fetchIngredientsFail(state);

    default:
      return state;
  }
};

export default reducer;
