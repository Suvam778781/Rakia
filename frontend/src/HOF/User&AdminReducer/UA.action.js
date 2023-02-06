import axios from "axios"
import { ADMIN_LOGIN_ERROR, ADMIN_LOGIN_LOADING, ADMIN_LOGIN_SUCCES, USER_LOGIN_ERROR, USER_LOGIN_LOADING, USER_LOGIN_SUCCES, USER_RESISTOR_ERROR, USER_RESISTOR_LOADING, USER_RESISTOR_SUCCES } from "./UA.actionTypes"


export const user_login=(logindata)=>async(dispatch)=>{
    console.log(logindata)
    try{
dispatch({type:USER_LOGIN_LOADING})

let res=await axios.post(`https://comfortable-bass-poncho.cyclic.app/users/login`,logindata)
localStorage.removeItem("admintoken")
localStorage.setItem("token",res.data.token)
console.log(res)
dispatch({type:USER_LOGIN_SUCCES,payload:res.data.token})
    }catch(err){
        // alert(err)
        dispatch({type:USER_LOGIN_ERROR,payload:err})
    }
}
export const user_signup=(signupdata)=>async(dispatch)=>{
    console.log(signupdata)
    try{
        dispatch({type:USER_RESISTOR_LOADING})
        let res=await axios.post(`https://comfortable-bass-poncho.cyclic.app/users/resistor`,signupdata)
        dispatch({type:USER_RESISTOR_SUCCES,payload:signupdata})
            }catch(err){
                dispatch({type:USER_RESISTOR_ERROR,payload:err})
            }
}
export const admin_login=(adminlogindata)=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_LOGIN_LOADING})
        let res=await axios.post(`https://comfortable-bass-poncho.cyclic.app/admin/login`,adminlogindata)
        localStorage.removeItem("token")
        localStorage.setItem("admintoken",res.data.token)
        dispatch({type:ADMIN_LOGIN_SUCCES,payload:res.data.token})
            }catch(err){
                dispatch({type:ADMIN_LOGIN_ERROR,payload:err})
            }
}

export const user_signout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("admintoken")

 }