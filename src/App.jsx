import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyEvents from "./pages/MyEvents/MyEvents";
import ExploreEvents from "./pages/ExploreEvents/ExploreEvents";
import Navbar from "./components/Navbar/Navbar";
import CreateEvents from "./pages/CreateEvents/CreateEvents";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import image from "../src/assets/home-1.png";
import AuthNav from "./components/Navbar/AuthNav";
import Footer from "./components/Footer/Footer"
// import './App.css'
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const [isLoggedin, setIsLoggedin] = useState(true);

  const handleLogout = () => {
    // Removing an access token from localStorage
    localStorage.removeItem("accessToken");
    setIsLoggedin(false);
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const authNav = <AuthNav />;

  return (
    <>
      {!isAuthPage ? (
        <Navbar isLoggedin={isLoggedin} onLogout={handleLogout} />
      ) : (
        authNav
      )}
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/explore" element={<ExploreEvents />} />
        <Route path="/createevents" element={<CreateEvents />} />
      </Routes>

      {!isAuthPage && <Footer />}

    </>
  );
};

export default App;
