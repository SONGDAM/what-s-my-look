import { useState, useEffect, createContext } from 'react';
import Carousel from './components/Carousel';
import TemperatureImages from './components/TemperatureImages';
import Comment from './components/Comment';
import './styles/global.css';

// context 셍성
export const weatherStateContext = createContext(null);

function App() {
  const [weather, setWeather] = useState({
    city: '',
    temp: '',
  });

  useEffect(() => {
    const getWeather = async (position) => {
      const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

      // 현재 위치 api
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //api call
      const json = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
      ).json();

      //setState 함수로 객체 업데이트
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
    <>
      <weatherStateContext.Provider value={weather}>
        <Carousel />
        <Comment />
        <TemperatureImages />
      </weatherStateContext.Provider>
    </>
  );
}

export default App;
