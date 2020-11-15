import { isEmpty } from "../../utils/validation";
import { SET_USER, CLEAR_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: isEmpty(action.payload),
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default reducer;
