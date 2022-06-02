import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Product from "./components/Products";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/Product"} element={<Product />} />
      </Routes>
    </div>
  );
};

export default App;
