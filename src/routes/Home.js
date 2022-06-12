import { useState, useEffect, createContext } from 'react';
import Carousel from '../components/Carousel';
import '../styles/global.css';
import NavBar from '../components/NavBar';
import Look from '../components/Look';
import Login from '../components/Login';
import authState, { isLoggedInState } from '../recoil/authState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  setPersistence,
  browserLocalPersistence,
  //onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../components/firebase';

export const weatherStateContext = createContext(null);
export const ImageStateContext = createContext(null);

function Home() {
  const authedUser = useRecoilValue(authState);
  const isLogin = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    const validateUser = () => {
      if (!authedUser) {
        return;
      }

      if (authedUser) {
        setPersistence(auth, browserLocalPersistence).catch(() => {
          console.error('unAuthedUser');
        });

        isLogin(true);
      }
    };

    validateUser();
  }, [authedUser, isLogin]);

  const [imgdata, setImgData] = useState([]);

  const imageAndLikeCount = async () => {
    await fetch(
      `https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json`
    )
      .then((response) => response.json())
      .then((data) => setImgData(data));
  };

  const [weather, setWeather] = useState({
    city: '',
    temp: '',
  });

  const getWeather = async (position) => {
    const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const json = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
    ).json();

    setWeather({
      city: json.name,
      temp: json.main.temp,
    });
  };

  useEffect(() => {
    imageAndLikeCount();
  }, []);

  useEffect(() => {
    const getCurrentWeather = () => {
      navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);
    };

    const getWeatherError = () => {
      console.error("CAN'T GET API");
    };

    getCurrentWeather();
  }, []);

  console.log(authedUser);

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
