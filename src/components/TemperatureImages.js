import { images } from './images';
import { weatherStateContext } from '../routes/Home';
import '../styles/TemperatureImages.css';
import { useContext } from 'react';

// import TemperatureComment from './TemperatureComent';

function TemperatureImages() {
  const context = useContext(weatherStateContext);

  const realtimeTemp = Math.round(context.temp);

  const filteredLook = images.filter((img) => realtimeTemp < img.temperature);

  return (
    <div className='temp_look_img_container '>
      {filteredLook
        ? filteredLook.map((item) => (
            <img src={item.src} key={item.id} className='temp_look_img' />
          ))
        : null}
    </div>
  );
}

export default TemperatureImages;
