import '../styles/Carousel.css';
import React, { useContext } from 'react';
import { weatherStateContext } from '../routes/Home';

function WeatherInfo() {
  //context로 데이터 받아오기(temp, city)
  const context = useContext(weatherStateContext);

  return (
    <div className='title'>
      <h2>{context.city}</h2>
      <h3>
        {context.temp ? `Now: ${Math.round(context.temp)}℃` : 'Loading...'}
      </h3>
    </div>
  );
}

export default React.memo(WeatherInfo);
