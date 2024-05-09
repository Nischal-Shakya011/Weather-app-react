import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Icon from "../components/Icons";

export default function Weather(){

const [position, setPosition] = useState()
const [weather, setWeather] = useState()
const [hourly, setHourly] = useState()
// const [index, setIndex] = useState(0)
const [isloading, setIsLoading] = useState(false)
const [selectedDate, setSelectedDate] = useState(new Date())
// console.log(selectedDate);

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
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.latitude}&lon=${position.longitude}&cnt=40&appid=${key}`)
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

  function handleTomorrow(){
    let tomorrow = new Date(selectedDate)
    tomorrow.setDate(selectedDate.getDate() + 1)
    setSelectedDate(tomorrow)
  }

  function handlePrevious(){
    let previous = new Date(selectedDate)
    previous.setDate(selectedDate.getDate() - 1)
    setSelectedDate(previous)
  }

let filteredDate =hourly && hourly.filter((dat)=>{
    console.log(dat);
let date = new Date(dat.dt_txt)
return(
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear()
)

  })

    return(
        <>
        <div className="bg-zinc-200 p-6">
        <div className=" container py-5">   
            <div className=" bg-white w-full p-6 mt-2  rounded-xl">
        <div className="text-2xl font-bold">Current Weather</div>
       {
        weather
        &&
        !isloading
              ?
              <>
        <div className="flex justify-between mt-3">
            <div className="flex gap-5">
            <div>
                <Icon weth={weather.weather[0].main}/>
            <div>{weather.weather[0].description}</div>
            </div>
            <div className="font-bold text-5xl">{Math.round(weather.main.temp - 273.15)}°C</div>
            <div>
            <div><span className="font-bold">Humidity:</span> {weather.main.humidity}%</div>
            <div><span className="font-bold">Pressure:</span> {weather.main.pressure} pa</div>
            <div><span className="font-bold">Wind:</span> {weather.wind.speed} km/h</div>
            </div>
            </div>
            <div>
            <div><span className="font-bold">Location:</span> {weather.name}</div>
            <div><span className="font-bold">Country:</span> {weather.sys.country}</div>
            </div>
        </div>

        </>
         :
         <div>Loading.....</div>
        }
        </div>
        </div>

        {
          weather
          &&
          !isloading
          &&
          filteredDate
                ?   
                <div className="container">
            <div className="mt-5 font-bold text-2xl">Hourly Weather Forecast</div>
{
    filteredDate.map(hour => {
        console.log(hour);
        return<>
        <div key={hour.dt} className="bg-white p-6 rounded-xl shadow-lg mt-5">
            <div className="flex justify-between">

                <div >
                <div className="flex">
                <div><Icon weth={hour.weather[0].main}/></div>
                <div className="font-bold text-5xl">{Math.round(hour.main.temp - 273.15)}°C</div>
                </div>
                <div>{hour.weather[0].description}</div>
                </div>

                <div className="font-bold text-xl">{formatTime(hour.dt_txt)}</div>

            </div>
            <div className="flex justify-between gap-7 mt-4">
                <div className="w-full">
                    <div className="flex justify-between font-semibold text-lg text-zinc-800 border-b-2 border-zinc-300 p-2"><span>Wind</span> <span>{hour.wind.speed}km/hr</span></div>
                    <div className="flex justify-between font-semibold text-lg text-zinc-800 border-b-2 border-zinc-300 p-2"><span>Cloud cover</span> <span>{hour.clouds.all}%</span></div>
                    <div className="flex justify-between font-semibold text-lg text-zinc-800 border-b-2 border-zinc-300 p-2"><span>Pressure</span> <span>{hour.main.pressure}pa</span></div>
                </div>
                <div className="w-full">
                    <div className="flex justify-between font-semibold text-lg text-zinc-800 border-b-2 border-zinc-300 p-2"><span>Gust</span> <span>{hour.wind.gust}Km/h</span></div>
                    <div className="flex justify-between font-semibold text-lg text-zinc-800 border-b-2 border-zinc-300 p-2"><span>Humidity</span> <span>{hour.main.humidity}%</span></div>
                    <div className="flex justify-between font-semibold text-lg text-zinc-800 border-b-2 border-zinc-300 p-2"><span>Max Temerature</span> <span>{Math.round(hour.main.temp_max - 273.15)}°C</span></div>
                </div>
            </div>
        
            </div>
        </>
    })
}
<div className="flex justify-center gap-5 mt-8">
<button onClick={handlePrevious} className='bg-green-800 p-2 rounded-lg text-white text-lg font-semibold '>Previous Day</button>
<button onClick={handleTomorrow} className='bg-green-800 p-2 rounded-lg text-white text-lg font-semibold '>Next Day</button>
</div>
        </div>
        :
        <div>Loading.....</div>
        }
        </div>
        </>
    )
}