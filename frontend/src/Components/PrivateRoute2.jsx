import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function PrivateRoute2({children}) {
  const userandadmin=useSelector((state)=>state.useradminReducer)
  if(userandadmin.adminloginSuc){
return children
  }
  else {
      return <Navigate to="/admin/login"/>
  }
}
export default PrivateRoute2
