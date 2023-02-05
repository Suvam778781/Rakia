import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute() {
  const userandadmin=useSelector((state)=>state.useradminReducer)
console.log()
  if(userandadmin.userloginSuc){
return (<Navigate to="/user/cart"/>)
  }
  else {
      return <Navigate to="/"/>
  }
}
export default PrivateRoute
