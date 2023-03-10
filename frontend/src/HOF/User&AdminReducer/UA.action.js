import axios from "axios";
import {
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCES,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCES,
  USER_RESISTOR_ERROR,
  USER_RESISTOR_LOADING,
  USER_RESISTOR_SUCCES,
} from "./UA.actionTypes";

export const UserLogin = (logindata) => async (dispatch) => {
  console.log(logindata);
  try {
    dispatch({ type: USER_LOGIN_LOADING });

    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/login`,
      logindata
    );
    localStorage.removeItem("admintoken");
    localStorage.setItem("token", res.data.token);
    console.log(res);
    dispatch({ type: USER_LOGIN_SUCCES, payload: res.data.token });
  } catch (err) {
    alert(`${err.response.data[0].msg}`);
    dispatch({ type: USER_LOGIN_ERROR, payload: err.response.data });
  }
};
export const UserSignup = (signupdata) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESISTOR_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/resistor`,
      signupdata
    );
    dispatch({ type: USER_RESISTOR_SUCCES, payload: signupdata });
  } catch (err) {
    alert(`${err.response.data[0].msg}`);

    dispatch({ type: USER_RESISTOR_ERROR, payload: err.response.data });
  }
};
export const AdminLoginF = (adminlogindata) => async (dispatch) => {

  try {
    dispatch({ type: ADMIN_LOGIN_LOADING });
    let res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/admin/login`,
      adminlogindata
    );
    console.log(res)
    localStorage.removeItem("token");
    localStorage.setItem("admintoken", res.data.admintoken);
    dispatch({ type: ADMIN_LOGIN_SUCCES, payload: res.data.token });
  } catch (err) {
  
    alert(`${err.response.data}`);
    dispatch({ type: ADMIN_LOGIN_ERROR, payload: err.response.data });
  }
};
export const UserSignout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admintoken");
};
