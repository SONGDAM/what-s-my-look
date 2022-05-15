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
  const [isLookBtnClick, setIsLookBtnClick] = useState(
    parseInt(Math.random() * 5)
  );
  const [sortImgArray, setSortImgArray] = useState(images);

  console.log('sortImgArray', sortImgArray);
  console.log('isLookBtnClick', isLookBtnClick);

  const lookList = ['Amekaji', 'Casual', 'Modern', 'Romantic', 'Street'];

  //Look버튼 클릭 시
  const lookOnclickHandler = (index, e) => {
    const lookName = e.target.textContent;
    console.log('look', index, lookName);

    //index값이랑 isLookBtnClick값 동일 시 스타일 해제 및 적용
    index === isLookBtnClick ? setIsLookBtnClick('') : setIsLookBtnClick(index);

    //룩별 , 온도별로 이미지 필터링
    setSortImgArray(
      sortImgArray.filter(
        (img) => img.look === lookName && img.temperature === imgTemp
      )
    );
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
  }, [imgTemp, temp]);

  const sortFilter = images.filter((img) => img.temperature === imgTemp);
  console.log('sortFilter', sortFilter);
  return (
    <>
      <Comment look={isLookBtnClick} />
      <div className='filter'>
        {lookList.map((look, index) => {
          return (
            <button
              key={index}
              onClick={(e) => {
                lookOnclickHandler(index, e);
              }}
              className={
                isLookBtnClick === index
                  ? 'filter-button--focused'
                  : 'filter-button--default'
              }
            >
              {look}
            </button>
          );
        })}
      </div>

      <div className='image-container'>
        <div className='image-wrapper'>
          {sortImgArray.length > 0
            ? sortImgArray
                .filter(
                  (item) =>
                    lookList[isLookBtnClick] === item.look &&
                    item.temperature === imgTemp
                )
                .map((item) => (
                  <img src={item.src} key={item.id} className='image-item' />
                ))
            : setSortImgArray(images)}
        </div>
      </div>
    </>
  );
}

// const sortImgFilter = images.filter((img) => img.temperature === imgTemp);
// console.log('sortImgFilter', sortImgFilter);

//   return (
//     <>
//       <Comment look={isClick} />
//       <div className='lookBtns'>
//         {lookList.map((look, i) => {
//           return (
//             <button
//               key={i}
//               onClick={() => {
//                 lookOnclickHandler(look, i);
//               }}
//               className={isClick === i ? 'lookBtnClicked' : 'lookBtnDefault'}

//             >
//               {look}
//             </button>
//           );
//         })}
//       </div>

//       <div className='image-container'>
//         <div className='image-wrapper'>
//           {sortImgArray.length > 0
//             ? sortImgArray
//                 .filter(
//                   (item) =>
//                     lookList[isLookBtnClick] === item.look &&
//                     item.temperature === imgTemp
//                 )
//                 .map((item) => (
//                   <img src={item.src} key={item.id} className='image-item' />
//                 ))
//             : setSortImgArray(images)}
//         </div>
//       </div>
//     </>
//   );
// }

export default TemperatureImages;
