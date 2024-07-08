import { useEffect, useState } from "react";
import Search from "../search";
import config from "../../../config";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [fahrenheit, setFahrenheit] = useState(true);

  const apiKey = config.API_KEY;

  async function fetchWeatherData(city) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();
      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function convertToFahrenheit(temp) {
    return Math.floor((temp - 273.15) * (9 / 5) + 32);
  }

  function convertToCelsius(temp) {
    return Math.floor(temp - 273.15);
  }

  function handleConversionSwitch() {
    fahrenheit ? setFahrenheit(false) : setFahrenheit(true);
  }

  function convertTemperature(temp) {
    if (fahrenheit) {
      const F = convertToFahrenheit(temp);
      return <p>{F}&deg; F</p>;
    }
    const C = convertToCelsius(temp);
    return <p>{C}&deg; C</p>;
  }

  useEffect(() => {
    fetchWeatherData("Seattle");
  }, []);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <p className="loading">Loading... please wait</p>
      ) : (
        <div className="weather-data">
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">
            {weatherData?.main?.temp
              ? convertTemperature(weatherData.main.temp)
              : ""}
            <button onClick={handleConversionSwitch}>
              convert to {fahrenheit ? "Celsius" : "Fahrenheit"}
            </button>
          </div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>wind speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
