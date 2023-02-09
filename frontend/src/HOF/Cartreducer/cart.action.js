import axios from "axios"
import { ADD_TO_CART, ADD_TO_CART_LOADING, CARTLIST_DATA, CART_ERROR, CART_LOADING, REMOVE_PRODUCTS_CART } from "./cart.actionTypes"
let Api_Url=process.env.REACT_APP_BASE_URL
export const CartlistGetdata=(UserId)=>async(dispatch)=>{
    let res=await fetch(`${process.env.REACT_APP_BASE_URL}/carts/${UserId}`)
    let cartlistdata=await res.json()
    dispatch({type:CARTLIST_DATA,payload:cartlistdata})
 }
export const RemoveFromCartlist=(id)=>async(dispatch)=>{
    let token=localStorage.getItem("token")||""
try{
    dispatch({type:CART_LOADING,payload:id})
await axios.delete(`${process.env.REACT_APP_BASE_URL}/carts/delete/${id}`)
dispatch({type:REMOVE_PRODUCTS_CART,payload:id})
}
catch(err){
    alert("something went wrong")
    dispatch({type:CART_ERROR})
}
}   
export const AddtocartProducts=(data)=>async(dispatch)=>{

    let token=localStorage.getItem("token")||""
    try {
        dispatch({type:CART_LOADING})
      
      await axios.post(`${process.env.REACT_APP_BASE_URL}/carts/addtocart`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
       )
       dispatch({type:ADD_TO_CART,payload:data})    

    }
    catch(err){
        
        alert("something went")
        dispatch({type:CART_ERROR})
    }
}

    export const UpdateCartProducts=(data)=>async(dispatch)=>{
        let token=localStorage.getItem("token")||""
        try{
            dispatch({type:CART_LOADING})
           await axios.post(`${process.env.REACT_APP_BASE_URL}/carts/update/${data._id}`,
           data,
           {
            headers: {
              Authorization:token,
            },
          }
           )
            dispatch({type:ADD_TO_CART,payload:data})
        }
        catch(err){
            alert("something went wrong")
            dispatch({type:CART_ERROR})
        }
        }