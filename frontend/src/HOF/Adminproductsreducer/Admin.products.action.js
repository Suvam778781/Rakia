import axios from "axios";
import {
  ADD_PRODUCT_ADMIN,
  ADD_PRODUCT_ERROR_ADMIN,
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT_LOADING_ADMIN,
  DELETE_PRODUCT_ADMIN,
  DELETE_PRODUCT_ERROR_ADMIN,
  DELETE_PRODUCT_LOADING,
  DELETE_PRODUCT_LOADING_ADMIN,
  GET_PRODUCT_DATA_ADMIN,
  GET_PRODUCT_DATA_ERROR_ADMIN,
  GET_PRODUCT_DATA_LOADING,
  GET_PRODUCT_DATA_LOADING_ADMIN,
  UPDATE_PRODUCT_ADMIN,
  UPDATE_PRODUCT_ERROR_ADMIN,
  UPDATE_PRODUCT_LOADING,
  UPDATE_PRODUCT_LOADING_ADMIN,
} from "./Admin.products.actionTypes";
export const GetProductForAdmin = (query) => async (dispatch) => {

    let products;  
  try {
    dispatch({ type: GET_PRODUCT_DATA_LOADING_ADMIN });

    if (query) {
    products = await axios(
        `${process.env.REACT_APP_BASE_URL}/products?q=${query}`
      );

      dispatch({ type: GET_PRODUCT_DATA_ADMIN, payload: products.data });
    } else {
      products = await axios(`${process.env.REACT_APP_BASE_URL}/products`);
    }

    dispatch({ type: GET_PRODUCT_DATA_ADMIN, payload: products.data });
  } catch (err) {
    dispatch({ type: GET_PRODUCT_DATA_ERROR_ADMIN, payload: err });
  }
};

export const DeleteProductForAdmin = (id) => async (dispatch) => {
  let admintoken = localStorage.getItem("admintoken") || "";
  try {
    dispatch({ type: DELETE_PRODUCT_LOADING_ADMIN });
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/products/delete/${id}`,{

        headers: {
          Authorization: admintoken,
        },

      }
    );
    dispatch({ type: DELETE_PRODUCT_ADMIN, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_ERROR_ADMIN, payload: err });
  }
};
export const UpdateProductForAdmin = (data) => async (dispatch) => {
  let admintoken = localStorage.getItem("admintoken") || "";
  try {
    dispatch({ type: UPDATE_PRODUCT_LOADING_ADMIN });
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/products/update/${data._id}`,
      data,
      {
        headers: {
          Authorization: admintoken,
        },
      }
    );
    alert("Product Update Succesfully")
    dispatch({ type: UPDATE_PRODUCT_ADMIN, payload: data });
  } catch (err) {
    alert("Something Went Wrong")
    dispatch({ type: UPDATE_PRODUCT_ERROR_ADMIN, payload: err });
  }
};
export const AddProductForAdmin = (data) => async (dispatch) => {
  let admintoken = localStorage.getItem("admintoken") || "";
  try {
    dispatch({ type: ADD_PRODUCT_LOADING_ADMIN });
    await axios.post(`${process.env.REACT_APP_BASE_URL}/products/create`, data, {
      headers: {
        Authorization: admintoken,
      },
    });
    alert("Product Add Succesfully")
    dispatch({ type: ADD_PRODUCT_ADMIN, payload: data });
  } catch (err) {
    console.log(err)
    alert("Something Went Wrong")
    dispatch({ type: ADD_PRODUCT_ERROR_ADMIN, payload: err });
  }
};

// export const GET_PRODUCT_DATA_ADMIN="get_data_admin";
// export const DELETE_PRODUCT_ADMIN="delete_product_admin";
// export const UPDATE_PRODUCT_ADMIN="edit_product_admin";
// export const ADD_PRODUCT_ADMIN="add_product_admin";

// export const GET_PRODUCT_DATA_LOADING_ADMIN="get_data_loading_admin";
// export const DELETE_PRODUCT_LOADING_ADMIN="delete_product_loading_admin";
// export const UPDATE_PRODUCT_LOADING_ADMIN="update_product_loading_admin";
// export const ADD_PRODUCT_LOADING_ADMIN="add_product_loading_admin";

// export const GET_PRODUCT_DATA_ERROR_ADMIN="get_data_error_admin";
// export const DELETE_PRODUCT_ERROR_ADMIN="delete_product_error_admin";
// export const UPDATE_PRODUCT_ERROR_ADMIN="update_product_error_admin";
// export const ADD_PRODUCT_ERROR_ADMIN="add_product_error_admin";
