import axios from "axios";
import {
  loginValidation,
  registerValidation,
  updateUserValidation,
} from "../../utils/validation";
import Cookies from "js-cookie";
import setAuthToken from "../../utils/setAuthToken";
import { SET_USER, CLEAR_USER, SET_MAIN_LOAD } from "./types";

export const cookieSetter = (data, { setCookies, saveToken } = {}) => async (
  dispatch
) => {
  if (saveToken) {
    let creds = Cookies.get("gh_creds");
    creds = JSON.parse(creds, true);
    data.token = creds.token;
  }
  if (setCookies) Cookies.set("gh_creds", data);
  setAuthToken(data.token);
  dispatch({
    type: SET_USER,
    payload: {
      fname: data.fname,
      lname: data.lname,
      contact: data.contact,
      email: data.email,
      address: data.address,
      avatar: data.avatar,
    },
  });
};

export const register = (credentials) => async (dispatch) => {
  const errors = registerValidation(credentials);
  if (errors) {
    return errors;
  } else {
    try {
      const res = await axios.post("/api/users/register", credentials);
      dispatch(cookieSetter(res.data, { setCookies: true }));
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
      dispatch(cookieSetter(res.data, { setCookies: true }));
    } catch (e) {
      return e.response.data;
    }
  }
};

export const updateUser = (details) => async (dispatch) => {
  console.log("Updating user. Details:");
  console.log(details);
  const errors = updateUserValidation(details);
  console.log(errors);
  if (errors) {
    return errors;
  } else {
    console.log("No errors so far");
    try {
      const res = await axios.patch("/api/users/update", details);
      console.log(res.data);
      dispatch(cookieSetter(res.data, { setCookies: true, saveToken: true }));
    } catch (e) {
      dispatch(handleBadResponse(e));
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

export const handleBadResponse = (e) => (dispatch) => {
  console.log(e);
  if (e.response.status === 401) dispatch(logout());
  else return e.response.data;
};

export const logout = () => (dispatch) => {
  Cookies.remove("gh_creds");
  setAuthToken(false);
  dispatch({
    type: CLEAR_USER,
  });
};
