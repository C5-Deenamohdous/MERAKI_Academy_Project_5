import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
};

export default App;
