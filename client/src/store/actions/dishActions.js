import axios from "axios";
import { SET_DISHES, CLEAR_DISHES, SET_TAGS, CLEAR_TAGS } from "./types";

export const setDishes = (query) => async (dispatch) => {
  try {
    const res = await axios.get("/api/dishes/list", {
      params: query,
    });
    dispatch({
      type: SET_DISHES,
      payload: res.data,
    });
  } catch (e) {
    return e.response.data;
  }
};

export const setTags = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/dishes/tags");
    dispatch({
      type: SET_TAGS,
      payload: res.data,
    });
  } catch (e) {
    return e.response.data;
  }
};

export const clearTags = () => {
  return {
    type: CLEAR_TAGS,
  };
};

export const clearDishes = () => {
  return {
    type: CLEAR_DISHES,
  };
};
