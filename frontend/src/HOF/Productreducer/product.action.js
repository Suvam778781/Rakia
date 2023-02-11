import axios from "axios"
import { GET_PRODUCTS_DATA, LOADING_PRODUCTS_DATA, PRODUCTS_ERROR } from "./product.actionTypes"
  export const ProductsGetdata=(query,allquery)=>async(dispatch)=>{
    console.log(allquery.brand)
    let res
    try{
        dispatch({type:LOADING_PRODUCTS_DATA})
        if(allquery){
      res= await axios(`${process.env.REACT_APP_BASE_URL}/products?category=${allquery.category}&brand=${allquery.brand}`)
        }
        else{ res= await axios(`${process.env.REACT_APP_BASE_URL}/products?q=${query}`)}
     
    dispatch({type:GET_PRODUCTS_DATA,payload:res.data})
    }catch(err){
        dispatch({type:PRODUCTS_ERROR})
    }
 }


