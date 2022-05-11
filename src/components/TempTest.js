import { weatherStateContext } from '../App';
import '../styles/TemperatureImages.css';
import { useContext, useEffect, useState } from 'react';
import { images } from './images';

// import TemperatureComment from './TemperatureComent';

function TemperatureImages() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);
  console.log('temp', temp);

  const [imgTemp, setImgTemp] = useState(0);

  useEffect(() => {
    if (temp >= 28) {
      return setImgTemp(28);
    } else if (temp >= 23 && temp < 27) {
      return setImgTemp(23);
    } else if (temp >= 20 && temp <= 22) {
      return setImgTemp(20);
    } else if (temp >= 17 && temp <= 19) {
      return setImgTemp(17);
    } else if (temp >= 12 && temp <= 16) {
      return setImgTemp(12);
    } else if (temp >= 9 && temp <= 11) {
      return setImgTemp(9);
    } else if (temp >= 5 && temp <= 8) {
      return setImgTemp(5);
    } else if (temp <= 4) {
      return setImgTemp(4);
    }
  }, [imgTemp, temp]);

  console.log('lookTemp', imgTemp);

  const sortFilter = images.filter((img) => img.temperature === imgTemp);
  console.log('sortFilter', sortFilter);
  return (
    <div className='temp_look_img_container'>
      {sortFilter
        ? sortFilter.map((item) => (
            <img src={item.src} key={item.id} className='temp_look_img' />
          ))
        : null}
    </div>
  );
}

export default TemperatureImages;
