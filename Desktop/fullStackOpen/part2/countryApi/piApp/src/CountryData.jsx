import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const CountryData = ({ country }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (country) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}&aqi=no`
        )
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [api_key, country]);

  return (
    <div>
      {country && (
        <>
          {" "}
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>area: {country.area}</p>
          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png}></img>
          {weatherData && (
            <div className="weather-data">
              <h3>Weather in {country.capital} </h3>

              <span>temperature:{weatherData.current.temp_c}°C</span>
              <img
                className="weather-icon"
                src={weatherData.current.condition.icon}
              ></img>

              <span> wind: {weatherData.current.wind_kph} km/h</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountryData;
