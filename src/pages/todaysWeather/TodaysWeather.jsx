import React from "react";
import Navbar from "../../component/navbar/Navbar";
import {
  formatToLocalTime,
  getFormattedWeatherData,
  iconUrlFromCode,
} from "../../services/weatherServices";


import "./todaysWeather.css";
import { useState, useEffect } from "react";
// import { TiWeatherPartlySunny } from "react-icons/ti";

function TodaysWeather() {
  const [weather, setWeather] = useState(null);
  const [query] = useState({ q: "nepal" });
  const [units] = useState("metric");

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        //  console.log(data);
      });
    };

    fetchWeather();
  }, [query, units]);
  return (
    <>
      <Navbar />
      {weather && (
        <div className="container">
          <p className="detailsPara"><span className="detailsSpan">{weather.details}</span></p>
          <div className="tempDetails">
            

            <div className="imageDetails">
              <img
                src={iconUrlFromCode(weather.icon)}
                alt=""
                className="image"
                width="200px"
                height="200px"
              /></div>
              <p className="todaysTemp">
                {formatToLocalTime(weather.dt, weather.timeZone)}
              </p>
            
          </div>

          
          <div className="todaysWeathers">
          <h3>Hourly Forecast</h3>
            <div className="todaysWeatherCards">
              {weather.hourly.map((item) => (
                <div className="todaysWeatherDetails">
                  <p>{item.title}</p>
                  <img
                    src={iconUrlFromCode(item.icon)}
                    alt=""
                    className="image"
                    width="200px"
                    height="200px"
                  />
                  <p>{item.temp.toFixed()}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodaysWeather;
