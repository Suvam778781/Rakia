import { GET_PRODUCTS_DATA, LOADING_PRODUCTS_DATA, PRODUCTS_ERROR } from "./product.actionTypes";
  const initialstate={
    Products:[],
    Loading:false,
    Error:false,
}
  export const ProductsReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
   case GET_PRODUCTS_DATA:
    return { ...state, Products: payload,Loading:false};
    case LOADING_PRODUCTS_DATA:
        return {...state,Loading:true}
    case PRODUCTS_ERROR:
        return {...state,Error:true,Loading:false}    
      default:
        return state;
    }
  };
// //   
// case GET_CARTLIST_DATA:
//     return { ...state, CartList: payload };
// case ADD_TO_CART:
//     return { ...state, CartList: [...state.CartList, payload] };
// // case REMOVE_PRODUCTS_CART:
//     let filterdatacart = state.CartList.filter((ele) => ele.id !== payload);
//     return { ...state, CartList: filterdatacart };