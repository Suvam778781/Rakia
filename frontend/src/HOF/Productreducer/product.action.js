import axios from "axios"
import { GET_PRODUCTS_DATA, LOADING_PRODUCTS_DATA, PRODUCTS_ERROR } from "./product.actionTypes"
  export const Products_Getdata=()=>async(dispatch)=>{
    try{
        dispatch({type:LOADING_PRODUCTS_DATA})
     let res= await axios(`url`)
    let productsdata=await res.json()
    dispatch({type:GET_PRODUCTS_DATA,payload:productsdata})
    }catch(err){
        dispatch({type:PRODUCTS_ERROR})
    }
 }