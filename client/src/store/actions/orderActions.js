import axios from "axios";
import { SET_CART, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "./types";

export const setCart = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/cart");
    dispatch({
      type: SET_CART,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const addToCart = (id, quantity) => async (dispatch) => {
  try {
    const res = await axios.post("/api/orders/addtocart", { id, quantity });
    console.log(res.data);
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
