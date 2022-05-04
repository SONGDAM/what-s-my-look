import { useContext } from 'react';
// import { images } from './imeges';
import { weatherStateContext } from '../App';

function TemperatureImages() {
  const context = useContext(weatherStateContext);

  console.log(context.temp);
  console.log(context.city);

  let now = new Date();
  let time = now.getHours() + ':' + now.getMinutes();
  console.log('time', time);

  // const tem_filter = items.filter((items) => items.temperature == temperature);
  // console.log('items_tem,filter_tem', items.temperature);

  // const tem_map = tem_filter.map((img) => <img src={img.src} key={img.id} />);
  return (
    <div>
      {/* temperature is {temperature}
      <div className=''>{tem_map}</div> */}
    </div>
  );
}

export default TemperatureImages;
