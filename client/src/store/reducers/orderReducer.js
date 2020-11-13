import {
  SET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/types";

const initialState = {
  cart: [],
  inCart: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload.cart,
        inCart: action.payload.inCart,
      };
    default:
      return state;
  }
};

export default reducer;
