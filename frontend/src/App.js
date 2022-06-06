import "./App.css";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/Product"} element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/OneProduct/:id" element={<OneProduct />} />
        <Route path="/category/:id" element={<OneCategory />} />
        <Route path="/CreateCategory" element={<CreateCategory />} />
        <Route path="/CreateBrand" element={<CreateBrand />} />
        <Route path="/CreateProduct" element={<CreateProduct />} />
        <Route path="/CreateCategory" element={<CreateCategory />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/brand/:id" element={<OneBrand />} />
        <Route path="/cart" element={<CartSection />} />
        <Route path="/User/:id" element={<UserProfile />} />
        <Route path="/admin/user/:id" element={<UserProfilePanel />} />
        <Route path="/Wishlist" element={<WishlistSection />} />
        <Route path="/ChatRoom" element={<ChatRoom />} />

        <Route path="/contactUs" element={<ContactUs />} />
      <Route path="admin/:id/details" element={<ContactUs />} />

      </Routes>
    </div>
  );
};

export default App;
