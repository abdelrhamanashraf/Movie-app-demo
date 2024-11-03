import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import UserSettings from "./pages/profile";
import Navbar from "./components/navbar";
import List from "./pages/movies";
const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/profile" element={<UserSettings />} />
         <Route path="/movies" element={<List />} />
      </Routes>
        
      </>
  );
};

export default App;
