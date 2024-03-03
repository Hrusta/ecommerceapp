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
        {/* Wrap your app with ShoppingCartProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
