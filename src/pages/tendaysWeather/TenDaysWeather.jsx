import React from "react";
import Navbar from "../../component/navbar/Navbar";
// import myImg from "./images/download.png";
import "./tenDaysWeather.css";
import { useState, useEffect } from "react";
import { formatToLocalTime, getFormattedWeatherData, iconUrlFromCode } from "../../services/weatherServices";

const formatFiveWeather = () => {

  const [weather, setWeather] = useState(null);
  const [query] = useState({ q:"country" });
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
              {weather.daily.slice(1,10).map((item) => (
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

export default formatFiveWeather;
