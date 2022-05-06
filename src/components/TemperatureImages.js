import { useContext, useEffect, useState } from 'react';
import { images } from './images';
import { weatherStateContext } from '../App';
import '../styles/TemperatureImages.css';

// import TemperatureComment from './TemperatureComent';

function TemperatureImages() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);
  const [look_temp, set_look_temp] = useState(0);

  console.log('temp', temp);
  console.log(context.city);

  //기온을 이미지 기온과 맞춤, 조건문 가독성있게 고치기...
  useEffect(() => {
    if (temp >= 27) {
      set_look_temp(27);
    } else if (temp >= 22) {
      set_look_temp(22);
    } else if (temp >= 19) {
      set_look_temp(19);
    } else if (temp >= 16) {
      set_look_temp(16);
    } else if (temp >= 11) {
      set_look_temp(11);
    } else if (temp >= 4) {
      set_look_temp(8);
    } else if (temp <= 4) {
      set_look_temp(4);
    }
  }, []);

  console.log('look_temp', look_temp);

  const temp_look_filter = images.filter(
    (img) => img.temperature === look_temp
  );

  const temp_look_map = temp_look_filter.map((item) => (
    <img src={item.src} key={item.id} className='temp_look_img' />
  ));

  return (
    <>
      {/* <TemperatureComment /> */}
      <div className='temp_look_img_container'>{temp_look_map}</div>
    </>
  );
}

export default TemperatureImages;
