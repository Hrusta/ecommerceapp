// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <NavBar />
      <AuthContextProvider>
        {" "}
        {/*  */}
        <Routes>
          <Route path="ecommerceapp/" element={<Home />} />
          <Route path="ecommerceapp/login" element={<Login />} />
          <Route path="ecommerceapp/register" element={<Register />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
