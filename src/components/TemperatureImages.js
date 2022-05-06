import { useContext, useState } from 'react';
import { images } from './images';
import { weatherStateContext } from '../App';
import '../styles/TemperatureImages.css';

// import TemperatureComment from './TemperatureComent';

function TemperatureImages() {
  const context = useContext(weatherStateContext);
  // 자주변경되는 건 state로 관리하는 게 좋은데 이런경우는 context에서 Math.round를 해야 될 것 같음..
  const temp = Math.round(context.temp);

  const [look_temp, set_look_temp] = useState(0);

  console.log('temp', temp);
  console.log(context.city);

  //기온을 이미지 기온과 맞춤, 조건문 가독성있게 고치기...
  //다시 리렌더링 되는 방향 생각. useEffect는 컴포넌트 최초 마운트시 실행됨 (빈배열기준) .
  // 함수형 업데이트 렌더? 리턴 생각하기
  const filterTemp = {
    high: 24 <= 30,
    middle: 18 <= 20,
    low: 5 < 10,
  };

  const { high, middle, low } = filterTemp;

  switch (filterTemp) {
    case temp >= 27:
      return set_look_temp(high);
    case temp >= 19:
      return set_look_temp(middle);
    case temp >= 10:
      return set_look_temp(low);
    default:
      false;
  }

  console.log('look_temp', look_temp);

  const filteredLook = images.filter((img) => img.temperature === look_temp);

  return (
    <>
      {/* <TemperatureComment /> */}
      {temp === look_temp
        ? filteredLook.map((item) => (
            <img src={item.src} key={item.id} className='temp_look_img' />
          ))
        : null}
    </>
  );
}

export default TemperatureImages;
