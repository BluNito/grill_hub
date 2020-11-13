import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./types";

export const addToCart = (id, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id,
      quantity,
    },
  };
};
