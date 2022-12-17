import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {GoogleLogout} from 'react-google-login';

import "./navbar.css";
const clientId = "953711835477-ddjbeo82uepehsq1iea6dskkolc5sh8a.apps.googleusercontent.com";
const Navbar = () => {
  const onSuccess = () =>{
    console.log("logoutsuccessfully");
  }
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    navigation({ pathname: "/login" });
  };
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <h1 className="logo">Weather Forecasting</h1>
        </Link>
      </div>

      <div className="navLinks">
        <NavLink to="/" className=""></NavLink>
        <NavLink to="/todaysWeather" className="todaysWeather">
          Todays Weather
        </NavLink>
        <NavLink to="/tenDaysWeather" className="tenDaysWeather">
          Ten Days weather
        </NavLink>
        <NavLink to="/humidity" className="humidity">
          Humidity
        </NavLink>
        <NavLink to="/sunriseSunset" className="sunriseSunset">
          Sunrise Sunset
        </NavLink>
      </div>

      <button className="logoutBtn" 
      onClick={handleLogout}>
        Logout

      </button>
      <GoogleLogout 
      clientId={clientId}
      // buttonText={Logout}
      onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Navbar;
