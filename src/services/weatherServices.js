// const API_KEY = "fc22bc6ec538314b693449a172bff67e";
import { DateTime } from "luxon";
const API_KEY = "fc22bc6ec538314b693449a172bff67e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
// const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  // console.log(url);

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt, //date time stamp
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  
  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly} = data;
  // this is daily timeZone
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
    // fiveDay = fiveDay.slice(1,6).map((d) => {
    //   return {
    //     title: formatToLocalTime(d.dt, timezone, "mm/dd/yyyy"),
    //     temp: d.temp,
    //     icon: d.weather[0].icon,
    //   };
    // })
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather",searchParams)
  .then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};
// this is in luxon format
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc,dd LLL yyyy' | Local time: 'hh:mm a"
) =>
  DateTime.fromSeconds(secs)
    .setZone(zone)
    .toFormat(format);

// for to give a icon url
const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png `;

 

export { formatToLocalTime, iconUrlFromCode,getFormattedWeatherData };
