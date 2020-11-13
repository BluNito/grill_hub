import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/types";

const initialState = {
  cart: [],
  inCart: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let newList = [...state.cart];
      const index = state.cart.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index > -1)
        newList[index].quantity =
          newList[index].quantity + action.payload.quantity;
      else newList.push(action.payload);
      return {
        ...state,
        cart: newList,
        inCart: state.inCart + action.payload.quantity,
      };
    default:
      return state;
  }
};

export default reducer;
