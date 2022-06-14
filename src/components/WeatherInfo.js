import '../styles/Carousel.css';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { getWeatherApi } from '../recoil/apiCallSelector';

function WeatherInfo() {
  //recoil로 데이터 받아오기(temp, city)
  const weather = useRecoilValue(getWeatherApi);

  const scrollTo = () => {
    window.scrollTo(0, 1000);
  };

  return (
    <div className='title'>
      <span>
        {weather.name} {`${Math.round(weather.main?.temp)}℃`}
      </span>
      <p>매일 아침 무엇을 입을지 고민하시나요?</p>
      <p>오늘의 기온에 맞는 옷차림을 추천해드려요</p>
      <button onClick={scrollTo}>기온별 옷차림 추천받기</button>
    </div>
  );
}

export default React.memo(WeatherInfo);
