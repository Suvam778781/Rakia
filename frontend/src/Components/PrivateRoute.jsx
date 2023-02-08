import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
  const userandadmin=useSelector((state)=>state.useradminReducer)
  if(userandadmin.userloginSuc){
return children
  }
  else {
      return <Navigate to="/login"/>
  }
}
export default PrivateRoute
