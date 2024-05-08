import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Weather(){

const [weather, setWeather] = useState()
const [position, setPosition] = useState()


useEffect(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords);
            setPosition(position.coords)
        }) 
},[])

useEffect(()=>{
    if(position){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=daae8c6a3b119e3e18b67428049acdb4`)
        .then((res)=>{
            console.log(res.data);
            setWeather(res.data)
        }) 
    }
},[position])

    return(
        <>
        <div className="flex justify-center">
            <div className=" bg-blue-900 p-6 w-[30%] text-center text-white mt-10 rounded-xl">
        <div className="text-2xl font-bold">Current Weather</div>
       {
        weather
        &&
        <div className="mt-3 text-lg font-semibold">
            <div>{weather.weather[0].description}</div>
            <div>Location: {weather.name}</div>
            <div>Country: {weather.sys.country}</div>
            <div>Temperature: {weather.main.temp} K</div>
            <div>Humidity: {weather.main.humidity}%</div>
            <div>Pressure: {weather.main.pressure} pa</div>
        </div>
        }
        </div>
        </div>
        </>
    )
}