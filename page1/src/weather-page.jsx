import React, {useEffect} from "react";

export const WeatherPage = () => {
 
  const qwe = async () => {
    let response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,weather_code,uv_index&daily=weather_code"
    );
    let jtxt = await response.json;
    console.log(jtxt);
  };

  return (
    <div>
     <button onClick={qwe}>go</button>
    </div>
  );
};
