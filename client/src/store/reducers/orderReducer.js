import {
  SET_CART,
  SET_CART_ITEMS,
  CLEAR_CART,
  CLEAR_CART_ITEMS,
  SET_ORDERS,
  CLEAR_ORDERS,
} from "../actions/types";

const initialState = {
  cart: [],
  cartInfo: {
    cartItems: [],
    total: 0,
  },
  inCart: 0,
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload.cart,
        inCart: action.payload.inCart,
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartInfo: action.payload,
      };
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: {
          cartItems: [],
          total: 0,
        },
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};

export default reducer;
