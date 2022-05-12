import { images } from './images';
import Comment from './Comment';
import { weatherStateContext } from '../routes/Home';
import '../styles/TemperatureImages.css';
import { useContext, useEffect, useState } from 'react';

//if문 바깥으로 빼고 if문의 결과를 리턴하는 함수를 만들어서 그함수를 useEffect에서 실행해보기

function TemperatureImages() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);

  const [imgTemp, setImgTemp] = useState(0);
  const [isClick, setIsClick] = useState(parseInt(Math.random() * 5));
  const [imgArray, setImgArray] = useState(images);
  console.log('imgArray', imgArray);

  //Look
  const lookList = ['Amekaji', 'Casual', 'Modern', 'Romantic', 'Street'];

  //Look버튼 클릭 시
  const lookOnclickHandler = (e, id) => {
    e.preventDefault;
    console.log('e', e, id);

    //id값이랑 isClick값 동일 시 스타일 해제 및 적용
    id === isClick ? setIsClick('') : setIsClick(id);
    console.log('isClick', isClick);

    //룩별 , 온도별로 이미지 필터링
    const sortLookFilter = setImgArray(
      imgArray.filter((img) => img.look === e && img.temperature === imgTemp)
    );

    console.log('sortLookFilter', sortLookFilter);
  };

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
  }, [imgTemp, temp, imgArray]);

  // const sortImgFilter = images.filter((img) => img.temperature === imgTemp);
  // console.log('sortImgFilter', sortImgFilter);

  return (
    <>
      <Comment look={isClick} />
      <div className='lookBtns'>
        {lookList.map((look, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                lookOnclickHandler(look, i);
              }}
              className={isClick === i ? 'lookBtnClicked' : 'lookBtnDefault'}
            >
              {look}
            </button>
          );
        })}
      </div>
      <div className='temp_look_img_container'>
        {/* {sortImgFilter
          ? sortImgFilter.map((item) => (
              <img src={item.src} key={item.id} className='temp_look_img' />
            ))
          : null} */}
        {imgArray
          .filter(
            (item) =>
              lookList[isClick] === item.look && item.temperature === imgTemp
          )
          .map((item) => (
            <img src={item.src} key={item.id} className='temp_look_img' />
          ))}
      </div>
    </>
  );
}

export default TemperatureImages;
