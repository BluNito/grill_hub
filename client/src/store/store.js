import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import comReducer from "./reducers/comReducer";
import dishReducer from "./reducers/dishReducer";
const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers({
  auth: authReducer,
  coms: comReducer,
  dishes: dishReducer,
});
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
