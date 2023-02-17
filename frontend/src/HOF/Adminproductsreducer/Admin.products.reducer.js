import {
  ADD_PRODUCT_ADMIN,
  ADD_PRODUCT_ERROR_ADMIN,
  ADD_PRODUCT_LOADING_ADMIN,
  DELETE_PRODUCT_ADMIN,
  DELETE_PRODUCT_ERROR_ADMIN,
  DELETE_PRODUCT_LOADING_ADMIN,
  GET_PRODUCT_DATA_ADMIN,
  GET_PRODUCT_DATA_ERROR_ADMIN,
  GET_PRODUCT_DATA_LOADING_ADMIN,
  UPDATE_PRODUCT_ADMIN,
  UPDATE_PRODUCT_ERROR_ADMIN,
  UPDATE_PRODUCT_LOADING_ADMIN,
} from "./Admin.products.actionTypes";

const initialstate = {
  Products: [],
  AddLoading: false,
  GetLoading: false,
  UpdateLoading: false,
  DeleteLoading: false,
  AddError: false,
  GetError: false,
  DeleteError: false,
  UpdateError: false,
};

export const AdminReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    //get products;
    case GET_PRODUCT_DATA_LOADING_ADMIN:
      return { ...state, GetLoading: true };

    case GET_PRODUCT_DATA_ADMIN:
      return { ...state, GetLoading: false, Products: payload };

    case GET_PRODUCT_DATA_ERROR_ADMIN:
      return { ...state, GetError: true, Loading: false };

    // delete admin;
    case DELETE_PRODUCT_LOADING_ADMIN:
      return { ...state, DeleteLoading: true };

    case DELETE_PRODUCT_ADMIN:
      let filterdata = state.Products.filter((ele) => ele._id !== payload);

      return { ...state, DeleteLoading: false, filterdata };

    case DELETE_PRODUCT_ERROR_ADMIN:
      return { ...state, Error: true, DeleteLoading: false };

    // update product;
    case UPDATE_PRODUCT_LOADING_ADMIN:
      return { ...state, UpdateLoading: true };

    case UPDATE_PRODUCT_ADMIN:
      let updatedata = state.Products.map((ele) => {
        if (ele._id == payload._id) {
          return { ...ele, payload };
        } else return ele;
      });
      return { ...state, UpdateLoading: false, Products: updatedata };

    case UPDATE_PRODUCT_ERROR_ADMIN:
      return { ...state, UpdateError: true, UpdateLoading: false };

    //add product
    case ADD_PRODUCT_LOADING_ADMIN:
      return { ...state, AddLoading: true };

    case ADD_PRODUCT_ADMIN:
      return {
        ...state,
        Products: [...state.Products, payload],
        AddLoading: false,
      };

    case ADD_PRODUCT_ERROR_ADMIN:
      return { ...state, AddError: true, AddLoading: false };

    default:
      return state;
  }
};

// let today=new Date();
// console.log(today.getDate(),today.getMonth(),today.getFullYear())
