import React, { useState } from 'react'
import './WeatherApp.css'

import SearchIcon from '../Assets/search.png'
import ClearIcon from '../Assets/clear.png'
import CloudIcon from '../Assets/cloud.png'
import RainIcon from '../Assets/rain.png'
import DrizzleIcon from '../Assets/drizzle.png'
import SnowIcon from '../Assets/snow.png'
import HumidityIcon from '../Assets/humidity.png'
import WindIcon from '../Assets/wind.png'


const WeatherApp = () => {

  let api_key = "0d88b077d3686c680b97086d99e0efa5";
  const [wIcon, setWicon] = useState(CloudIcon);

  const search = async () => {
      
    const element = document.getElementsByClassName("city-input");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    if(element[0].value===""){
      return 0;
    }
    
    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percentage");
    const wind = document.getElementsByClassName("wind-speed");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n") {
      setWicon(ClearIcon);
    }
    else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n") {
      setWicon(CloudIcon);
    }
    else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n") {
      setWicon(DrizzleIcon);
    }
    else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n") {
      setWicon(DrizzleIcon);
    }
    else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n") {
      setWicon(RainIcon);
    }
    else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n") {
      setWicon(RainIcon);
    }
    else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n") {
      setWicon(SnowIcon);
    }
    else {
      setWicon(ClearIcon);
    }
  }

  return (

    <div className="container">
      <div className="nav-bar">
        <input type="text" className="city-input" placeholder="Search"/>
        <div className="search-icon" onClick={ () => search()}>
          <img src={SearchIcon} alt="" srcSet="" />
        </div>
      </div>
      
      <div className="weather-image">
        <img src={wIcon} alt="" srcSet="" />
      </div>
      <div className="weather-temp">?°C</div>
      <div className="weather-location">City Name</div>
      
      <div className="data-container">
        <div className="element">
          <img src={HumidityIcon} alt="" className="icon"/>
          <div className="data">
            <div className="humidity-percentage">? %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={WindIcon} alt="" className="icon"/>
          <div className="data data-2">
            <div className="wind-speed">? km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WeatherApp