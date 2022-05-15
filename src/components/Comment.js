import { weatherStateContext } from '../routes/Home';
import { useContext } from 'react';
import '../styles/Comment.css';

function Comment(props) {
  const context = useContext(weatherStateContext);
  const temp = Math.round(context.temp);


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
      <div className='recommend_script'>

        현재 {temp} °C 에 맞는 {lookName(props.look)} 룩을 추천해드려요
      </div>
    </div>
  );
}

export default Comment;
