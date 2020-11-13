import axios from "axios";
import { loginValidation, registerValidation } from "../../utils/validation";
import Cookies from "js-cookie";
import setAuthToken from "../../utils/setAuthToken";
import { SET_USER, CLEAR_USER, SET_MAIN_LOAD } from "./types";

export const cookieSetter = (data, setCookies) => async (dispatch) => {
  if (setCookies) Cookies.set("gh_creds", data);
  setAuthToken(data.token);
  dispatch({
    type: SET_USER,
    payload: data,
  });
};

export const register = (credentials) => async (dispatch) => {
  const errors = registerValidation(credentials);
  if (errors) {
    return errors;
  } else {
    try {
      const res = await axios.post("/api/users/register", credentials);
      dispatch(cookieSetter(res.data, true));
    } catch (e) {
      return e.response.data;
    }
  }
};

export const login = (credentials) => async (dispatch) => {
  credentials = {
    email: credentials.email,
    password: credentials.password,
  };
  const errors = loginValidation(credentials);
  if (errors) {
    return errors;
  } else {
    try {
      const res = await axios.post("/api/users/login", credentials);
      dispatch(cookieSetter(res.data, true));
    } catch (e) {
      return e.response.data;
    }
  }
};

export const autologin = (credentials) => async (dispatch) => {
  const jsonCreds = JSON.parse(credentials, true);
  dispatch(cookieSetter(jsonCreds));
  dispatch({
    type: SET_MAIN_LOAD,
    payload: false,
  });
};

export const logout = () => (dispatch) => {
  Cookies.remove("gh_creds");
  setAuthToken(false);
  dispatch({
    type: CLEAR_USER,
  });
};
