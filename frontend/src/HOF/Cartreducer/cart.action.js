import axios from "axios";
import {
  ADD_TO_CART,
  CARTLIST_DATA,
  CART_ERROR,
  CART_LOADING,
  CART_UPDATE,
  REMOVE_PRODUCTS_CART,
} from "./cart.actionTypes";
export const CartlistGetdata = () => async (dispatch) => {
  const token = localStorage.getItem("token") || "";
  let cartlistdata;
  console.log(cartlistdata);
  try {
    dispatch({ type: CART_LOADING });
    cartlistdata = await axios.get(`${process.env.REACT_APP_BASE_URL}/carts`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: CARTLIST_DATA, payload: cartlistdata.data });
  } catch (err) {
    alert("something went wrong");
    dispatch({ type: CART_ERROR, payload: err });
  }
};
export const RemoveFromCartlist = (id) => async (dispatch) => {
  let token = localStorage.getItem("token") || "";
  console.log(id);
  try {
    dispatch({ type: CART_LOADING, payload: id });
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/carts/delete/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: REMOVE_PRODUCTS_CART, payload: id });
  } catch (err) {
    alert("something went wrong");
    dispatch({ type: CART_ERROR });
  }
};
export const AddtocartProducts = (data) => async (dispatch) => {
  let token = localStorage.getItem("token") || "";
  try {
    dispatch({ type: CART_LOADING });

    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/carts/addtocart`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: ADD_TO_CART, payload: data });
  } catch (err) {
    alert("something went");
    dispatch({ type: CART_ERROR });
  }
};

export const UpdateCartProducts = (data) => async (dispatch) => {
  console.log(data);
  let token = localStorage.getItem("token") || "";
  try {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/carts/update/${data._id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({ type: CART_UPDATE, payload: data });
  } catch (err) {
    alert("something went wrong");
    console.log(err);
    dispatch({ type: CART_ERROR });
  }
};