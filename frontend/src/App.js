import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";
import Product from "./components/Products";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import OneProduct from "./components/OneProduct";
import OneCategory from "./components/OneCategory";
import CreateCategory from "./components/CreateCategory";
import CreateProduct from "./components/create product";
import CreateBrand from "./components/CreateBrand";
import UpdateProduct from "./components/UpdateProduct";
import OneBrand from "./components/OneBrand";
import CartSection from "./components/CartSection";
import UserProfile from "./components/userprofile";
import UserProfilePanel from "./components/UserInAdmin";
import ContactUs from "./components/ContactUs";
import WishlistSection from "./components/WishList";
import ChatRoom from "./components/ChatRoom";
import OrderDetails from "./components/AdminOrderDetails";
import AdminProducts from "./components/AdminProducts";
import UsersControlPanel from "./components/AllUsers";
import Orders from "./components/Orders";
import AdminUserOrder from "./components/AdminUserOrder";
import AdminUserCompletedOrders from "./components/AdminCompletedUserOrder";
import AdminUserUnCompletedOrders from "./components/AdminUnCompletedUserOrder";
import Home from "./components/Home";
import Analysis from "./components/analysis";

import CheckOutPage from "./components/CheckoutPage";

import Footer from "./components/footer";
import NotFound from "./components/NotFoundPage";
import ProfileUnCompleteddOrders from "./components/PofileUnCompletedOrdedrs";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location.pathname]);

  return (
    <div className="App">
      {location.pathname.includes("admin") ? <Admin /> : <NavBar />}

      {/* <Footer/> */}

      <Routes>
        <Route path={"/Product"} element={<Product />} />
        <Route path="/admin/Analysis" element={<Analysis />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/OneProduct/:id" element={<OneProduct />} />
        <Route path="/category/:id" element={<OneCategory />} />
        <Route path="/brand/:id" element={<OneBrand />} />
        <Route path="/cart" element={<CartSection />} />
        <Route path="/User/:id" element={<UserProfile />} />
        <Route path="/Wishlist" element={<WishlistSection />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        {/* All Admin Routes */}

        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/all_users" element={<UsersControlPanel />} />
        <Route path="/admin/user/:id" element={<UserProfilePanel />} />
        <Route path="/admin/CreateCategory" element={<CreateCategory />} />
        <Route path="/admin/CreateBrand" element={<CreateBrand />} />
        <Route path="/admin/CreateProduct" element={<CreateProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/all_orders" element={<Orders />} />
        <Route path="/admin/order_details/:id" element={<OrderDetails />} />
        <Route path="/admin/user_orders/:id" element={<AdminUserOrder />} />
        <Route
          path="/admin/user_orders_completed/:id"
          element={<AdminUserCompletedOrders />}
        />
        <Route
          path="/admin/user_orders_uncompleted/:id"
          element={<AdminUserUnCompletedOrders />}
        />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/MyOrders" element={<ProfileUnCompleteddOrders />} />
        <Route path="/admin" element={""}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
