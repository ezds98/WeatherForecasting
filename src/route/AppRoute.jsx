import React from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "../component/navbar/Navbar";
import Home from "../pages/home/Home";
import Humidity from "../pages/humidity/Humidity";
import ProtectedRoute from "../pages/login/ProtectedRoute";
import Login from "../pages/login/UserLogin";
import Signup from "../pages/register/UserRegister";
import SunriseSet from "../pages/sunriseSet/SunriseSet";
import TenDaysWeather from "../pages/tendaysWeather/TenDaysWeather";
import TodaysWeather from "../pages/todaysWeather/TodaysWeather";
// import { useState } from "react";

const AppRoutes = () => {
  const navigation = useNavigate();
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn !== "true") {
      navigation({ pathname: "/login" });
    } else {
      navigation({ pathname: "/" });
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>

        <Route path="/" element={<ProtectedRoute/>}>
        <Route path="/" element={<Home />}></Route>

        <Route path="/todaysWeather" element={<TodaysWeather />}></Route>
        <Route path="/humidity" element={<Humidity />}></Route>
        <Route path="/sunriseSunset" element={<SunriseSet />}></Route>
        <Route path="/tenDaysWeather" element={<TenDaysWeather />}></Route>
        </Route>

        <Route path="*" element={<h1>Page Not found</h1>}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
