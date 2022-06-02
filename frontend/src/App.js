import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Product from "./components/Products";
import Admin from "./components/Admin";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/Product"} element={<Product />} />
         <Route path="/admin" element={<Admin />}/> 
 
      </Routes>
    </div>
  );
};

export default App;
