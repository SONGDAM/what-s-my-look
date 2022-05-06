import { weatherStateContext } from '../App';
import { useContext } from 'react';
import '../styles/TemperatureComment.css';

function Comment() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);

  //객체의 불변성을 고려햐여 state나 새로운 배열 생성
  // https://hsp0418.tistory.com/171
  //underbar말고 카멜케이스로 갑시다..

  //기온 조건문으로  recommend_script배열에 추천글 설정
  // 분기를 다른 뱡향으로 설정해여 재활용을 고려했으면 함.
  // unrecommend를 만들어서 분기를 다르게 고려하는 건 어떨까요?
  // early return 분기 최소화...
  // 객체 직접수정 노노

  const Comment = {
    highTempComment: '기분좋은 바람이 부는 오늘, 이런 룩은 어떠세요',
    lowTempComment: '오늘의 룩을 추천해드려요',
  };

  //recommend_script배열의 내용을 랜덤값으로 불러옴

  return (
    <div className='recommend_script'>
      {temp < 10 ? Comment.highTempComment : Comment.lowTempComment}
    </div>
  );
}

export default Comment;
