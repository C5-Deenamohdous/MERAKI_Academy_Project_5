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
import UpdateProduct from "./components/UpdateProduct";
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
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
      </Routes>
    </div>
  );
};

export default App;
