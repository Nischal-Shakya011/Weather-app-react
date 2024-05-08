import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Weather(){

const [position, setPosition] = useState()
const [weather, setWeather] = useState()
const [hourly, setHourly] = useState()
// const [index, setIndex] = useState(0)
const [isloading, setIsLoading] = useState(false)

let key = "daae8c6a3b119e3e18b67428049acdb4"


useEffect(() => {
        navigator.geolocation.getCurrentPosition((position)=>{
            // console.log(position.coords);
            setPosition(position.coords)
        }) 
},[])

useEffect(()=>{
    if(position){
        setIsLoading(true)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=daae8c6a3b119e3e18b67428049acdb4`)
        .then((res)=>{
            // console.log(res.data);
            setWeather(res.data)
            // setIsLoading(false)
        }) 
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&cnt=24&appid=${key}`)
        .then((res)=>{
            // console.log(res.data.list);
            setHourly(res.data.list);
            setIsLoading(false)
        })
    }
},[position])

const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

    return(
        <>
        <div className="flex justify-center">
            
                
            <div className=" bg-blue-900 p-6 w-[30%] text-center text-white mt-10 rounded-xl">
        <div className="text-2xl font-bold">Current Weather</div>
       {
        weather
        &&
        !isloading
              ?
              <>
        <div className="mt-3 text-lg font-semibold">
            <div>{weather.weather[0].description}</div>
            <div>Location: {weather.name}</div>
            <div>Country: {weather.sys.country}</div>
            <div>Temperature: {weather.main.temp} K</div>
            <div>Humidity: {weather.main.humidity}%</div>
            <div>Pressure: {weather.main.pressure} pa</div>
            {/* <div>{weather.weather[0].icon}</div> */}
        </div>

        <div>
            <div className="mt-5 font-bold text-xl">Hourly</div>
{
    hourly.map(hour => {
        console.log(hour);
        return<>
            <div>Temperature: {hour.main.temp}</div>
            <div>Time: {formatTime(hour.dt_txt)}</div>
            {/* <div>Time: {hour.dt_txt}</div> */}
        </>
    })
}
            {/* <div>Date and Time</div>
            <div>Temperature: {hourly[index].main.temp}</div>
                <div>Humidity: {hourly[index].main.humidity}</div> */}
            {/* <button className="bg-red-600 p-2 rounded-lg" disabled={index === daily.length - 1} onClick={()=>{setIndex((ind) => ind + 1)}}>Next</button><br />
            <button className="bg-red-600 p-2 rounded-lg mt-2" disabled={index === 0} onClick={()=>{{setIndex((ind) => ind -1)}} }>Previous</button> */}
        </div>

        </>
         :
         <div>Loading.....</div>
        }
        </div>
       
        
        </div>
        </>
    )
}