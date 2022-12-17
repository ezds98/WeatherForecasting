import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import "./home.css";
import Navbar from "../../component/navbar/Navbar";
import {
  formatToLocalTime,
  getFormattedWeatherData,
  iconUrlFromCode,
} from "../../services/weatherServices";
import { useState } from "react";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import londonImg from "./images/london.jpg";
import japnImg from "./images/japan.jpg";
import sydneyImg from "./images/sydney.jpg";
import torontoImg from "./images/toronto.jpg";
import parisImg from "./images/france.jpg";

const Home = () => {
  const [query, setQuery] = useState({ q: "nepal" });
  const [units] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        // console.log(data);
      });
    };

    fetchWeather();
  }, [query, units]); //every time we changes new data

  const handleSearchClick = () => {
    
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      if (navigator.geolocation) {
        // toast.info("Fetching users location.");
        navigator.geolocation.getCurrentPosition((position) => {
          // toast.success("Location fetched!");
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          setQuery({
            lat,
            lon,
          });
        });
      }
    }
  };

  const cities = [
    {
      id: 1,
      imagePath: londonImg,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
      imagePath: sydneyImg,
    },
    {
      id: 3,
      title: "Tokyo",
      imagePath: japnImg,
    },
    {
      id: 4,
      title: "Toronto",
      imagePath: torontoImg,
    },
    {
      id: 5,
      title: "Paris",
      imagePath: parisImg,
    },
  ];

  return (
    <>
      <Navbar />

      <section className="container homepage">
        <div className="section-left">
          <div className="search">
            <div className="searchBox">
              <BsSearch onClick={handleSearchClick} />

              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setCity(e.currentTarget.value)}
              />
            </div>

            <span className="button" onClick={handleLocationClick}>
              <IoLocationOutline size={25} className="location" />
              Local Weather
            </span>
          </div>

          <div className="cities">
            <h3 className="sectionHeading">
              Weather <span className="highlight">Forecast</span>
            </h3>
            <div className="weatherStats">
              {cities.map((city) => (
                <div
                  className="city"
                  key={city.id}
                  onClick={() => setQuery({q:city.imagePath, q:city.title })}
                >
                  <div className="cityImage">
                    <img
                      src={city.imagePath}
                      alt={city.imagePath}
                      width="50px"
                      height="50px"
                    />
                  </div>

                  <span>{city.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-right">
          {!weather && "Loading..."}

          {weather && (
            <section className="todayWeather">
              <div className="todayWeatherResult">
                <h2>{weather.temp.toFixed()}°</h2>

                <div className="locationTime">
                  <h3>{weather.name}</h3>
                  <p className="today">
                    {formatToLocalTime(weather.dt, weather.timeZone)}
                  </p>
                </div>

                <div className="todaysIcon">
                  {/* <TiWeatherPartlySunny /> */}
                  <img
                    src={iconUrlFromCode(weather.icon)}
                    alt=""
                    className="image"
                    width="70"
                    height="70"
                  />

                  <p>Mostly sunny</p>
                </div>
              </div>

              <h3 className="sectionHeading">
                Daily <span className="highlight">ForeCast</span>
              </h3>
              <div className="todaysWeathers">
                <div className="todaysWeatherCards">
                  {weather.daily.slice(1,6).map((item) => (
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
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
