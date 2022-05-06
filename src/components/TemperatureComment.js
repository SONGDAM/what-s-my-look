import { weatherStateContext } from '../App';
import { useContext } from 'react';
import '../styles/TemperatureComment.css';

function TemperatureComment() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);

  //기온별 룩 추천글 담을 배열 생성
  let recommend_script = [];

  //기온 조건문으로  recommend_script배열에 추천글 설정
  if (10 < temp) {
    recommend_script = [
      '기분좋은 바람이 부는 오늘, 이런 룩은 어떠세요',
      '10도 룩 추천2',
      '10도 룩 추천 3',
    ];
  } else {
    recommend_script = ['오늘의 룩을 추천해드려요', '어쩌구 저ㅉ쩌구'];
  }

  console.log(recommend_script);

  //recommend_script배열의 내용을 랜덤값으로 불러옴
  const random_script = parseInt(Math.random() * recommend_script.length);

  return (
    <div className='recommend_script'>{recommend_script[random_script]}</div>
  );
}

export default TemperatureComment;
