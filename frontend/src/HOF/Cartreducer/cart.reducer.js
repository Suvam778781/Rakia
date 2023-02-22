const {
  ADD_TO_CART,
  CARTLIST_DATA,
  REMOVE_PRODUCTS_CART,
  CART_LOADING,
  CART_ERROR,
  CART_UPDATE,
  
} = require("./cart.actionTypes");
const initialstate = {
  Cart: [],
  CartLoading: false,
  Error: false,
  CartSucces:false,
  CartTotal:0,
  CheckoutAddress:{},
};
export const CartReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case CARTLIST_DATA:
      return { ...state, Cart: payload, CartLoading: false ,CartSucces:true};
    case ADD_TO_CART:
      return { ...state,Cart: [...state.Cart, payload] ,CartLoading:false};
    case REMOVE_PRODUCTS_CART:
      let filterdatacart = state.Cart.filter((ele) => ele._id !== payload);
      return { ...state, Cart: filterdatacart ,CartLoading: false};
    case CART_LOADING:
      return { ...state, CartLoading: true };
      case CART_ERROR:
        return {...state, CartLoading: false,Error:true};
        case CART_UPDATE:
        let newdata=state.Cart.map((ele)=>{
          if(ele._id===payload._id){
           return ele=payload
          }
          else return ele
        }
        )
        return {...state,Cart:newdata,CartLoading:false}
    default:
      return state;
  }
};
