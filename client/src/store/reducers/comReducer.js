import { SET_MAIN_LOAD, SET_DIMENSIONS } from "../actions/types";

const initialState = {
  mainLoad: true,
  dimensions: {},
  colors: {
    main: "rgb(121, 17, 17)",
    accent: "rgb(154, 30, 30)",
  },
  sizes: {
    logoSize: "1.6rem",
    allCapSize: "0.9rem",
    titleSize: "1.7rem",
    subTitleSize: "1.5rem",
    miniTitleSize: "1.2rem",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIMENSIONS:
      return {
        ...state,
        dimensions: action.payload,
      };
    case SET_MAIN_LOAD:
      return {
        ...state,
        mainLoad: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
