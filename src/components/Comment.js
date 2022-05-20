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
        return 'Casual';
      case 1:
        return 'Modern';
      case 2:
        return 'Romantic';
      case 3:
        return 'Street';
    }
  }

  return (
    <div className='comment'>
      현재 {temp} °C 에 맞는 {lookName(props.look)} 룩을 추천해드려요
    </div>
  );
}

export default Comment;
