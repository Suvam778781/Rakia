import axios from "axios"
import { GET_PRODUCTS_DATA, LOADING_PRODUCTS_DATA, PRODUCTS_ERROR } from "./product.actionTypes"
  export const ProductsGetdata=(query)=>async(dispatch)=>{
    let res
    try{
        dispatch({type:LOADING_PRODUCTS_DATA})
        if(query){
      res= await axios(`${process.env.REACT_APP_BASE_URL}/products?q=${query}`)
        }
        else{ res= await axios(`${process.env.REACT_APP_BASE_URL}/products`)}
     
    dispatch({type:GET_PRODUCTS_DATA,payload:res.data})
    }catch(err){
        dispatch({type:PRODUCTS_ERROR})
    }
 }


