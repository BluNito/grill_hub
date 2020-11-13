import { SET_MAIN_LOAD, SET_DIMENSIONS } from "./types";

export const mainLoad = (mode) => (dispatch) => {
  dispatch({
    type: SET_MAIN_LOAD,
    payload: mode,
  });
};

export const setDimensions = (dimensions) => (dispatch) => {
  dispatch({
    type: SET_DIMENSIONS,
    payload: dimensions,
  });
};
