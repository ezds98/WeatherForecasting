import React from "react";
import "./sunriseSet.css";
import Navbar from "../../component/navbar/Navbar";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { BiUpArrowAlt } from "react-icons/bi";
import { BsArrowDownShort } from "react-icons/bs";
import { useState, useEffect } from "react";
import {
  formatToLocalTime,
  getFormattedWeatherData,
} from "../../services/weatherServices";

function SunriseSet() {
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
        <div className="sunriseSetContainer">
          <div className="riseSetDetails">
            <GiSunrise size={68}  className="iconRise"/>
            <p className="risePara">
              Rise:{" "}
              <span className="sunrise">
                {formatToLocalTime(
                  weather.sunrise,
                  weather.timezone,
                  "hh:mm a"
                )}
              </span>
            </p>
          </div>
          {/* <p className="font-light">|</p> */}
          <div className="riseSetDetails">
            <GiSunset size={68} className="iconSet"/>
            <p className="setPara">
              Set:{" "}
              <span className="sunSet">
                {formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}
              </span>
            </p>
          </div>
          {/* <p className="font-light">|</p> */}
          <div className="riseSetDetails">
            <BiUpArrowAlt size={68} className="iconHigh"/>
            <p className="high">
              High:
              <span className="">{weather.temp_max.toFixed()}°</span>
            </p>
          </div>
          {/* <p className="font-light">|</p> */}
          <div className="riseSetDetails">
            <BsArrowDownShort size={68} className="icon"/>

            <p className="low">
              Low:
              <span className="lowTemp">{weather.temp_min.toFixed()}°</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SunriseSet;
