import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Carousel from '../components/Carousel';
import '../styles/global.css';
import NavBar from '../components/NavBar';
import Look from '../components/Look';
import Login from '../components/Login';

// context 셍성(날씨와 지역정보를 전달하는 전역상태 )
export const weatherStateContext = createContext(null);
export const ImageStateContext = createContext(null);

function Home() {
  const [imgdata, setImgData] = useState({});

  const [weather, setWeather] = useState({
    city: '',
    temp: '',
  });

  const sendRequest = async () => {
    const response = await axios.get('http://localhost:8080');
    console.log(response);
    console.log(response.data);
  };

  const apiCall = async () => {
    await fetch(`https://what-s-my-look-default-rtdb.firebaseio.com/look.json`)
      .then((response) => response.json())
      .then((data) => setImgData(data));
  };

  const getWeather = async (position) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

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

  //에러 핸들링
  const getWeatherError = () => {
    throw console.error("CAN'T GET API");
  };

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    const getCurrentWeather = () => {
      navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);
    };

    getCurrentWeather();
  }, []);

  return (
    <>
      <ImageStateContext.Provider value={imgdata}>
        <weatherStateContext.Provider value={weather}>
          <NavBar />
          <Carousel />
          <Look />
          <Login />
        </weatherStateContext.Provider>
      </ImageStateContext.Provider>
    </>
  );
}
export default Home;
