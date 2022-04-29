import './App.module.css';

import { useEffect, useState } from 'react';

function App() {
  //날씨 데이터는 현재온도와 관련하여 계속 사용예정으로 props로 하위컴포넌트 전달 예정.
  //3개 이상의 컴포넌트에서 사용시 Context 사용.

  const [weather, setWeather] = useState({
    weather: '',
    city: '',
    temp: '',
  });

  // const [temp, setTemp] = useState('');

  // fetch로 api 호출

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

      console.log(json);

      //setState 함수 업데이트
      setWeather({
        weather: json.main,
        city: json.name,
        temp: json.main.temp,
      });
    };

    const getCurrentWeather = () => {
      navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);
    };

    const getWeatherError = () => {
      throw console.error("can't GET API");
    };

    getCurrentWeather();
  }, []);

  console.log(weather);
  return (
    <div>
      <div className='title'>
        <p>what &#39;s my look?</p>
      </div>
    </div>
  );
}

export default App;
