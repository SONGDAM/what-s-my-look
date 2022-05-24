import LookItem from './LookItem';
import { weatherStateContext } from '../routes/Home';
'import { ImageStateContext } from '../routes/Home';'
import '../styles/Look.css';
import { useContext, useEffect, useState } from 'react';
import Category from './Look';

function Look() {
  const weatherContext = useContext(weatherStateContext);
  const imageContext = useContext(ImageStateContext);

  const temp = Math.round(weatherContext.temp);

  // const [isLookClick, setIsLookClick] = useState('All');
  const [imgArray, setImgArray] = useState([]);
  const [selectTemp, setSelectTemp] = useState(17);

  const images = Object.values(imageContext).slice(0, 81);

  //이미지에서 look 종류 들고와서 배열에 담음
  const lookList = ['All', ...new Set(images.map((item) => item.look))];
  console.log(lookList);

  //분류된 온도 상태값이랑 맞는 이미지 온도 필터링
  const tempFilter = images.filter((img) => img.temperature === selectTemp);

  //분류된 온도 상태값 & 룩 이랑 맞는 이미지 온도 & 룩 필터링
  // const lookFilter = images.filter(
  //   (img) => img.temperature === selectTemp && img.look === isLookClick
  // );

  // const onclick = (e) => {};

  //룩 클릭 시 setState(setImgArray) 적용
  useEffect(() => {
    const handleSelectTemp = () => {
      if (temp >= 23 && temp < 28) {
        setSelectTemp(23);
        return;
      }
      if (temp >= 20 && temp <= 22) {
        setSelectTemp(20);
        return;
      }
      if (temp >= 17 && temp <= 19) {
        setSelectTemp(17);
        return;
      }
      if (temp >= 12 && temp <= 16) {
        setSelectTemp(12);
        return;
      }
      if (temp >= 9 && temp <= 11) {
        setSelectTemp(9);
        return;
      }
      if (temp >= 5 && temp <= 8) {
        setSelectTemp(5);
        return;
      }
      if (temp <= 4) {
        setSelectTemp(4);
        return;
      }

      return selectTemp;
    };

    handleSelectTemp();

    //클릭한게 all이면 온도필터만 적용(룩 적용 x ) & All이 아니면 ( 룩 선택 시) 선택한 룩필터링 적용
    setImgArray(isLookClick === 'All' ? tempFilter : lookFilter);
  }, [temp, selectTemp]);

  console.log(imgArray);

  //룩 클릭이벤트 (클릭 값 찾기)
  // const LookClickHandler = (lookName) => {
  //   setIsLookClick(isLookClick === lookName ? 'All' : lookName);
  // };

  return (
    <div>
      <>
        {/* <div className='filter'>
          {lookList.map((lookName, idx) => {
            return (
              <button
                key={idx}
                onClick={() => LookClickHandler(lookName)}
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
        </div> */}
        <Category />
      </>
      <div className='card'>
        <div className='card-wrapper'>
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
