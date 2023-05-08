import axios from "axios";
import React from "react";
import { useEffect } from "react";
import WeatherData from "./WeatherData";

const CountryData = ({ country }) => {
  const languageLength = Object.values(country.languages).length;
  const lat = country.latlng[0];
  const lon = country.latlng[1];
  console.log(lat, lon);
  const key = process.env.REACT_APP_API_KEY;
  let weather;
  console.log(process.env.REACT_APP_API_KEY);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat={${lat}}&lon={${lon}}&exclude={part}&appid={3634acd08c713abd4e18a0afa230b93c}`
      )
      .then((response) => {
        /*  weather = response */
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/*  <h2>{country.name.common}</h2> */}
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>{languageLength === 1 ? "language:" : "languages:"}</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.name.common}</h2>
      <p>temperature </p>
      <p></p>
    </div>
  );
};
// if one country

export default CountryData;
