import { weatherStateContext } from '../App';
import { useContext } from 'react';
import '../styles/Comment.css';

function Comment() {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);

<<<<<<< Updated upstream
  //객체의 불변성을 고려햐여 state나 새로운 배열 생성
  // https://hsp0418.tistory.com/171
  //underbar말고 카멜케이스로 갑시다..

  //기온 조건문으로  recommend_script배열에 추천글 설정
  // 분기를 다른 뱡향으로 설정해여 재활용을 고려했으면 함.
  // unrecommend를 만들어서 분기를 다르게 고려하는 건 어떨까요?
  // early return 분기 최소화...
  // 객체 직접수정 노노

  // const Comment = {
  //   highTempComment: '기분좋은 바람이 부는 오늘, 이런 룩은 어떠세요',
  //   lowTempComment: '오늘의 룩을 추천해드려요',
  // };
  const Comment = {
    temp4: {
      1: '온도 4-1',
      2: '온도 4-2',
    },
    temp5: {
      1: '온도 5-1',
      2: '온도 5-2',
    },
    temp9: {
      1: '온도 9-1',
      2: '온도 9-2',
    },
    temp12: {
      1: '온도 12-1',
      2: '온도 12-2',
    },
    temp17: {
      1: '온도 17-1',
      2: '온도 17-2',
    },
    temp20: {
      1: '온도 20-1',
      2: '온도 20-2',
    },
    temp23: {
      1: '온도 23-1',
      2: '온도 23-2',
    },
    temp28: {
      1: '온도 28-1',
      2: '온도 28-2',
    },
  };

  console.log(Comment);
  //recommend_script배열의 내용을 랜덤값으로 불러옴

  // const comment

  return (
    <div className='recommend_script'>
      {temp > 10 ? Comment.temp4[2] : Comment.temp4[1]}
=======
  //props에서 받은 isClick -> look이름으로 변환
  function lookName() {
    switch (props.look) {
      case 0:
        return 'Amekaji';
      case 1:
        return 'Casual';
      case 2:
        return 'Modern';
      case 3:
        return 'Romantic';
      case 4:
        return 'Street';
    }
  }

  return (
    <div>
      <div className='comment'>
        현재 {temp} °C 에 맞는 {lookName(props.look)} 룩을 추천해드려요
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default Comment;
