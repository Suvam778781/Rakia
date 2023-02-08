import axios from "axios"
import { ADD_TO_CART, ADD_TO_CART_LOADING, CARTLIST_DATA, CART_ERROR, CART_LOADING, REMOVE_PRODUCTS_CART } from "./cart.actionTypes"
export const Cartlist_Getdata=()=>async(dispatch)=>{
    let res=await fetch(`url`)
    let cartlistdata=await res.json()
    dispatch({type:CARTLIST_DATA,payload:cartlistdata})
 }
export const Remove_from_Cartlist=(_id)=>async(dispatch)=>{
    let token=localStorage.getItem("token")||""
try{
    dispatch({type:CART_LOADING,payload:_id})
await axios.delete(`https://comfortable-bass-poncho.cyclic.app/carts/delete/${_id}`)
dispatch({type:REMOVE_PRODUCTS_CART,payload:_id})
}
catch(err){
    alert("something went wrong")
    dispatch({type:CART_ERROR})
}
}   
export const Addtocart_products=(data)=>async(dispatch)=>{
    let token=localStorage.getItem("token")||""
    try {
        dispatch({type:CART_LOADING})
      await axios.post(`https://comfortable-bass-poncho.cyclic.app/carts/addtocart`,
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
        
        alert("something went wrong")
        dispatch({type:CART_ERROR})
    }
}

    export const Update_cart_products=(data)=>async(dispatch)=>{
        let token=localStorage.getItem("token")||""
        try{
            dispatch({type:CART_LOADING})
           await axios.post(`https://comfortable-bass-poncho.cyclic.app/carts/update/${data._id}`,
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