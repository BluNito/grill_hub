import axios from "axios";
import {
  SET_CART,
  SET_CART_ITEMS,
  CLEAR_CART,
  CLEAR_CART_ITEMS,
} from "./types";

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
    dispatch({
      type: SET_CART,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const setCartInfo = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/cartitems");
    dispatch({
      type: SET_CART_ITEMS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};

export const removeFromCart = (ids) => async (dispatch) => {
  console.log("Removing from cart");
  try {
    const res = await axios.patch("/api/orders/removefromcart", ids);
    dispatch({
      type: SET_CART,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
