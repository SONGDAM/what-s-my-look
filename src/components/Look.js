// import { images } from './Images';
import Comment from './Comment';
import LookItem from './LookItem';
import { weatherStateContext } from '../routes/Home';
import { ImageStateContext } from '../routes/Home';
import '../styles/Look.css';
import { useContext, useEffect, useState } from 'react';

function Look() {
  const weatherContext = useContext(weatherStateContext);
  const temp = Math.round(weatherContext.temp);
  const imageContext = useContext(ImageStateContext);
  const images = Object.values(imageContext).slice(0, 81);

  const [sortTemp, setSortTemp] = useState(0);
  const [isLookClick, setIsLookClick] = useState('All');
  const [imgArray, setImgArray] = useState([]);

  const lookList = ['All', ...new Set(images.map((item) => item.look))];
  console.log(lookList);

  //온도 분류
  const selectTempFn = function (temp) {
    let selectTemp = 0;
    if (temp >= 28) {
      return (selectTemp = 28);
    }
    if (temp >= 23 && temp < 27) {
      return (selectTemp = 23);
    }
    if (temp >= 20 && temp <= 22) {
      return (selectTemp = 20);
    }
    if (temp >= 17 && temp <= 19) {
      return (selectTemp = 17);
    }
    if (temp >= 12 && temp <= 16) {
      return (selectTemp = 12);
    }
    if (temp >= 9 && temp <= 11) {
      return (selectTemp = 9);
    }
    if (temp >= 5 && temp <= 8) {
      return (selectTemp = 5);
    }
    if (temp <= 4) {
      return (selectTemp = 4);
    }
    return selectTemp;
  };

  // 분류한 온도값 setState(setSortTemp) 적용 => 온도 맞는 전체 이미지 띄움
  useEffect(() => {
    setSortTemp(selectTempFn(temp));
  }, [temp, sortTemp]);

  //룩 클릭 시 setState(setImgArray) 적용
  useEffect(() => {
    const tempFilter = images.filter((img) => img.temperature === sortTemp);
    const lookFilter = images.filter(
      (img) => img.temperature === sortTemp && img.look === isLookClick
    );

    setImgArray(isLookClick === 'All' ? tempFilter : lookFilter);
  }, [isLookClick, sortTemp]);

  //룩 클릭이벤트 (클릭 값 찾기)
  const LookClickHandler = (lookName) => {
    setIsLookClick(isLookClick === lookName ? 'All' : lookName);
  };

  return (
    <div>
      <>
        <Comment look={isLookClick} />
        <div className='filter'>
          {lookList.map((lookName, idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  LookClickHandler(lookName);
                }}
                className={
                  isLookClick === lookName
                    ? 'filter-button--focused'
                    : 'filter-button--default'
                }
              >
                {lookName}
              </button>
            );
          })}
        </div>
      </>
      <div className='image-container'>
        <div className='image-wrapper'>
          {imgArray.length > 0 ? (
            imgArray.map((item, idx) => <LookItem card={item} key={idx} />)
          ) : (
            <h1>준비중 입니다 😃</h1>
          )}
        </div>
      </div>
    </div>
  );
}
export default Look;
