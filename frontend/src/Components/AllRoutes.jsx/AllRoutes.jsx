import React from "react";
import { Route, Routes } from "react-router-dom";
import AddToCartPage from "../../Pages/AddToCartPage";
import CheckoutPage from "../../Pages/CheckoutPage";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage";
import Orders from "../../Pages/Orders";
import PaymentPage from "../../Pages/PaymentPage";
import SignUpPage from "../../Pages/SignUpPage";
import SingleProductPage from "../../Pages/SingleProductPage";
import AdminDashBoard from "../AdminDashBoard";
import AdminLogin from "../AdminLogin";
import { NotFound } from "../NotFound";
import PrivateRoute from "../PrivateRoute";
import PrivateRoute2 from "../PrivateRoute2";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/user/cart"
        element={
          <PrivateRoute>
            <AddToCartPage/>
            </PrivateRoute>
        }
      />
      <Route
        path="user/cart/checkout"
        element={
          <PrivateRoute>
           <CheckoutPage /> 
           </PrivateRoute>
        }
      />
      <Route path="/products/:_id" element={<PrivateRoute><SingleProductPage/></PrivateRoute>} />
      <Route path="/user/orders" element={<PrivateRoute><Orders/></PrivateRoute>} />
      <Route path="/admin/dashboard" element={<PrivateRoute2> <AdminDashBoard /></PrivateRoute2>} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  );
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMjA5OWY0M2IzMjE3NGEzZDJmNTYiLCJpYXQiOjE2NzU1MDIzNDAsImV4cCI6MTY3NTU4ODc0MH0.lnJq7e7f_iumHhcdipaFOLSOnVOQmNoptpr1i-NWxdk
// Object
export default AllRoutes;
