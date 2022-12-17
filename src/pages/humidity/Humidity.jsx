import React from "react";
import { TbTemperature } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { TbWindmill } from "react-icons/tb";
import Navbar from "../../component/navbar/Navbar";
import "./humidity.css";
import { useState, useEffect } from "react";
import { getFormattedWeatherData } from "../../services/weatherServices";

function Humidity() {
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
    <div>
      <Navbar />
      {weather && (
        <div className="mainHumidity">
          <div className="tempDetailsHumidity">
            <TbTemperature size={68} className="tempDetailHumidityIcon" />
            Realfell:
            <span className="">{weather.feels_like.toFixed()}°</span>
          </div>
          <div className="tempDetailsHumidity">
            <WiHumidity size={68} className="tempDetailHumidityIcon" />
            Humidity:
            <span className="">{weather.humidity}%</span>
          </div>

          <div className="tempDetailsHumidity">
            <TbWindmill size={68} className="tempDetailHumidityIcon" />
            Wind:
            <span className="">{weather.speed}km/h</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Humidity;
