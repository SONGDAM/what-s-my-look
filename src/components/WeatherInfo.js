import { useState, useEffect } from 'react';

function WeatherInfo() {
  const [weather, setWeather] = useState({
    city: '',
    temp: '',
  });

  // fetch로 api 호출

  //useEffect의 디펜던시 빈 배열을 이용하여 컴포넌트 최초 마운트 시 api 호출
  useEffect(() => {
    const getWeather = async (position) => {
      const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const json = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
      ).json();

      //setState 함수 업데이트
      setWeather({
        city: json.name,
        temp: json.main.temp,
      });
    };

    //현재 위치 받는 함수
    const getCurrentWeather = () => {
      navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);
    };

    //에러 핸들링
    const getWeatherError = () => {
      throw console.error("CAN'T GET API");
    };

    getCurrentWeather();
  }, []);

  return (
    <div className='title'>
      <p>{weather.city}</p>
      <div>{`${Math.round(weather.temp)}℃`}</div>
    </div>
  );
}

export default WeatherInfo;
