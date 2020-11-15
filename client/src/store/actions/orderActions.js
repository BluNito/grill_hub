import axios from "axios";
import { handleBadResponse } from "./authActions";
import {
  SET_CART,
  SET_CART_ITEMS,
  CLEAR_CART,
  CLEAR_CART_ITEMS,
  SET_ORDERS,
  CLEAR_ORDERS,
} from "./types";

export const setCart = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/cart");
    dispatch({
      type: SET_CART,
      payload: res.data,
    });
  } catch (e) {
    dispatch(handleBadResponse(e));
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
    dispatch(handleBadResponse(e));
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
    dispatch(handleBadResponse(e));
  }
};

export const removeFromCart = (ids) => async (dispatch) => {
  try {
    const res = await axios.patch("/api/orders/removefromcart", ids);
    dispatch({
      type: SET_CART,
      payload: res.data,
    });
  } catch (e) {
    dispatch(handleBadResponse(e));
  }
};

export const dropCart = () => async (dispatch) => {
  try {
    const res = await axios.delete("/api/orders/dropcart");
    dispatch({
      type: SET_CART,
      payload: res.data,
    });
  } catch (e) {
    dispatch(handleBadResponse(e));
  }
};

export const initiatePayment = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/orders/create");
    return res.data;
  } catch (e) {
    dispatch(handleBadResponse(e));
  }
};

export const setOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/list");
    dispatch({
      type: SET_ORDERS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(handleBadResponse(e));
  }
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const clearCartItems = () => {
  return {
    type: CLEAR_CART_ITEMS,
  };
};

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  };
};
