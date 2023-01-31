import { ADD_TO_CART, ADD_TO_CART_LOADING, CARTLIST_DATA, REMOVE_PRODUCTS_CART } from "./cart.actionTypes"
export const Cartlist_Getdata=()=>async(dispatch)=>{
    let res=await fetch(`url`)
    let cartlistdata=await res.json()
    dispatch({type:CARTLIST_DATA,payload:cartlistdata})
 }
export const Remove_from_Cartlist=(id)=>(dispatch)=>{
// console.log(id)
axios.delete(`url/${id}`)
dispatch({type:REMOVE_PRODUCTS_CART,payload:id})
}   
export const Addtocart_products=(data)=>(dispatch)=>{
    try{
        dispatch({type:ADD_TO_CART_LOADING})
        axios.post(`url`,data)
        dispatch({type:ADD_TO_CART,payload:data})
    }
    catch(err){
        alert("something went wrong")
    }
   
    }