import { useState } from 'react';
import { items } from './items';

function ImgCon() {
  const [temperature, setTemperature] = useState(2);

  if (temperature < 4) {
    setTemperature(4);
  }

  console.log(temperature);

  const tem_filter = items.filter((items) => items.temperature == temperature);
  console.log('items_tem,filter_tem', items.temperature);

  const tem_map = tem_filter.map((img) => <img src={img.src} key={img.id} />);
  return (
    <div>
      temperature is {temperature}
      <div className=''>{tem_map}</div>
    </div>
  );
}

export default ImgCon;
