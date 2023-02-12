import axios from "axios"
import { GET_PRODUCTS_DATA, LOADING_PRODUCTS_DATA, PRODUCTS_ERROR } from "./product.actionTypes"
  export const ProductsGetdata=(query,allquery,page)=>async(dispatch)=>{
    let res;
        dispatch({type:LOADING_PRODUCTS_DATA})
        if(allquery.brand||allquery.category){
      res= await axios(`${process.env.REACT_APP_BASE_URL}/products?category=${allquery.category}&brand=${allquery.brand}`)
        }
        else{ res= await axios(`${process.env.REACT_APP_BASE_URL}/products?q=${query}`)}
    dispatch({type:GET_PRODUCTS_DATA,payload:res.data})
    
      // console.log(err)
      if(!res){
        dispatch({type:PRODUCTS_ERROR})}
    
 }


