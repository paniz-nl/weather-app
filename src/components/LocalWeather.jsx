import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const LocalWeather = ({show}) => {
    console.log(show);
    const [timeZone, setTimeZone] = useState('')
    const [city, setCity] = useState('');
    const [localData, setLocalData] = useState({});
    const [currntTime, setCurrentTime] = useState('');

   
    const Weather_API_KEY = "3b31aaf0f34aa93f2dfb828088ae841f";
   

    useEffect(() => {
        

        const getUserTimeZone = () => {
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            console.log("userTimeZone");
            setTimeZone(userTimeZone);
            const newCity = userTimeZone.slice(userTimeZone.indexOf("/") +1);
            setCity(newCity);
        };
        
        const getWeatherInfo = async () => {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Weather_API_KEY}`).then((response) => {
                  setLocalData(response.data)
    
                //   console.log(response.data);
              });
              const weatherData = response.data;
              console.log('Weather Data:', weatherData);
              setLocalData(weatherData)
            //   return weatherData;
            } catch (error) {
              console.error('Error fetching weather data:', error);
              return null;
            }
          };
          
        getUserTimeZone()
        getWeatherInfo()
        const intervalId = setInterval(() => { const now = moment().tz(`${timeZone}`);
         setCurrentTime(now.format('YYYY-MM-DD HH:mm:ss')); }, 1000); return () => clearInterval(intervalId)

    }, [])
    return (
        
        <div>
        {localData.weather ? (
          <div className="w-[500px] h-[250px] bg-gray-300 shadow-lg rounded-xl m-auto rounded-xl m-auto relative px-6 top-[10%]">
            <div className="flex justify-between w-full">
              <div className="w-1/2 my-4 mx-auto flex justify-between items-center">
                <div className="flex flex-col items-start justify-between h-full">
                  <div>
                    <p className="text-xl">
                      {localData.name},{localData.sys.country}
                    </p>
                    <p className="text-sm">
                      {localData.weather[0].description}
                    </p>
                    <p className="text-sm">
                      {currntTime}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-6xl font-semibold">
                      {localData.main.temp.toFixed()} °C
                    </h1>
                    <div className="flex justify-between gap-x-8">
                    <p>location</p>
                    <p className="font-bold w-20">
                      {city}
                    </p>
                  </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex flex-col justify-between items-end">
                <div className="relative">
                  <img
                    src={`http://openweathermap.org/img/wn/${localData.weather[0].icon}@2x.png`}
                    alt=""
                    className="w-[120px]"
                  />
                </div>
                {/* </div> */}
              {localData.name !== undefined ? (
                  <div className="flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs ">
                  <div className="flex justify-between gap-x-8">
                    <p>Feels Like</p>
                    <p className="font-bold w-20">
                      {localData.main.feels_like.toFixed()} °C
                    </p>
                    </div>
                  <div className="flex justify-between gap-x-8">
                    <p>Humidity</p>
                    <p className="font-bold w-20">
                      {localData.main.humidity.toFixed()} %
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p>Wind Speed</p>
                    <p className="font-bold w-20">
                      {localData.wind.speed.toFixed()} KPH
                    </p>
                  </div>
                  <div className="flex justify-between gap-x-8">
                    <p>Pressure</p>
                    <p className="font-bold w-20">
                      {localData.main.pressure} hPa
                    </p>
                  </div>
                </div>
              ) : null}
              </div>
            </div>
          </div>
        ) : <h1 className="flex justify-center font-bold text-4xl my-5">loading...</h1>}
      </div>
    );
};

export default LocalWeather;