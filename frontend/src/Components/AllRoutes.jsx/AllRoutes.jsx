import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddToCartPage from '../../Pages/AddToCartPage'
import CheckoutPage from '../../Pages/CheckoutPage'
import HomePage from '../../Pages/HomePage'
import LoginPage from '../../Pages/LoginPage'
import SignUpPage from '../../Pages/SignUpPage'
import SingleProductPage from '../../Pages/SingleProductPage'
import AdminDashBoard from '../AdminDashBoard'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/addtocart" element={<AddToCartPage/>}/>
      <Route path="/checkout" element={<CheckoutPage/>}/>
      <Route path="/products/:_id" element={<SingleProductPage/>}/>
      <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
    </Routes>
  )
}

export default AllRoutes
