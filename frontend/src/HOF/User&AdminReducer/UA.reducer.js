import { ADMIN_LOGIN_ERROR, ADMIN_LOGIN_LOADING, ADMIN_LOGIN_SUCCES, USER_LOGIN_ERROR, USER_LOGIN_LOADING, USER_LOGIN_SUCCES, USER_RESISTOR_ERROR, USER_RESISTOR_LOADING, USER_RESISTOR_SUCCES } from "./UA.actionTypes"

let initialState={
    admintoken:localStorage.getItem("admintoken")||null,
    usertoken:localStorage.getItem("token")||null,
    userloginLoad:false,
    userloginSuc:localStorage.getItem("token")?true:false,
    userloginErr:false,
    adminloginLoad:false,
    adminloginSuc:localStorage.getItem("admintoken")?true:false,
    adminloginErr:false,
    userresistorErr:false,
    userresistorLoad:false,
    userresistorSuc:false
}
export const UserAndAdminReducer=(state=initialState,{type,payload})=>{

switch(type){
    // user login //
    case USER_LOGIN_ERROR:return{...state,userloginErr:true,userloginLoad:false}
    case USER_LOGIN_LOADING:return{...state,userloginLoad:true}
    case USER_LOGIN_SUCCES:return{...state,userloginSuc:true,userloginLoad:false,usertoken:payload}
    // user resistor //
    case USER_RESISTOR_ERROR:return {...state,userresistorErr:true,userresistorLoad:false}
    case USER_RESISTOR_LOADING:return{...state,userresistorLoad:true}
    case USER_RESISTOR_SUCCES :return{...state,userresistorSuc:true,userresistorLoad:false}
    // admin login // 
    case ADMIN_LOGIN_ERROR:return{...state,adminloginErr:true}
    case ADMIN_LOGIN_LOADING:return{...state,adminloginLoad:true,adminloginErr:false}
    case ADMIN_LOGIN_SUCCES:return{...state,adminloginSuc:true,adminloginLoad:false}
default:
    return state

}


}