import {
  SET_DISHES,
  CLEAR_DISHES,
  SET_TAGS,
  CLEAR_TAGS,
} from "../actions/types";

const initialState = {
  tags: [],
  dishes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISHES:
      return {
        ...state,
        dishes: action.payload,
      };
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload,
      };
    case CLEAR_DISHES:
      return {
        ...state,
        dishes: [],
      };
    case CLEAR_TAGS:
      return {
        ...state,
        tags: [],
      };
    default:
      return state;
  }
};

export default reducer;
