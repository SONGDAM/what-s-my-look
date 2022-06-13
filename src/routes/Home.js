//import { useEffect } from 'react';
import Carousel from '../components/Carousel';
import '../styles/global.css';
import NavBar from '../components/NavBar';
import Look from '../components/Look';
import Login from '../components/Login';
import { useSetRecoilState } from 'recoil';
import { getCurrentPosition } from '../recoil/apiCallSelector';
import { useEffect } from 'react';

function Home() {
  const currentPosition = useSetRecoilState(getCurrentPosition);

  useEffect(() => {
    const getCurrentWeather = () => {
      navigator.geolocation.getCurrentPosition(getWeather, getWeatherError);
    };

    const getWeatherError = () => {
      console.error("CAN'T GET API");
    };

    const getWeather = async (position) => {
      currentPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    getCurrentWeather();
  }, [currentPosition]);

  return (
    <>
      <NavBar />
      <Carousel />
      <Look />
      <Login />
    </>
  );
}
export default Home;
