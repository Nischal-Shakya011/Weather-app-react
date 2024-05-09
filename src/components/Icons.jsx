import React from "react";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { BsCloudDrizzle } from "react-icons/bs";

export default function Icon({weth}){
// console.log(weth);
let weatherIcon;
switch(weth){
        case "Clouds":
        weatherIcon = <TiWeatherCloudy  className="inline text-6xl font-bold"/>
        break;

        case "Rain":
        weatherIcon = <TiWeatherShower className="inline text-6xl font-bold"/>
        break;

        case "Clear":
        weatherIcon = <TiWeatherSunny className="inline text-6xl font-bold"/>
        break;

        case "Thunderstorm":
        weatherIcon = <TiWeatherStormy className="inline text-6xl font-bold"/>
        break;

        case "Drizzle":
        weatherIcon = <BsCloudDrizzle className="inline text-6xl font-bold"/>
        break;

        default: 
        weatherIcon = null
}

    return(
        <>  
       {weatherIcon}
        </>
    )
}