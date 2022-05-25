import unLike from '../assets/icon/empty-heart.png';
import addLike from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useReducer, useState } from 'react';

const initialState = {
  count: 0,
  likes: [],
};

const ACTION_TYPE = {
  addLike: 'addLike',
  unLike: 'unLike',
};

const email = '1@g.com';

const reducer = (oldState, action) => {
  switch (action.type) {
    case ACTION_TYPE.addLike:
      return {
        count: oldState.count + 1,
        likes: [
          oldState.likes,
          {
            id: Date.now(),
            email,
          },
        ],
      };
    case ACTION_TYPE.unLike:
      return {
        count: oldState.count - 1,
        likes: oldState.likes.length - 1,
      };
    default:
      oldState;
  }
};

function Like() {
  const [like, dispatch] = useReducer(reducer, initialState);
  const [isClick, setIsClick] = useState(false);
  console.log('like', like);

  const addLikeHandler = () => {
    setIsClick(true);
    dispatch({ type: ACTION_TYPE.addLike });
  };

  const unLikeHandler = () => {
    setIsClick(false);
    dispatch({ type: ACTION_TYPE.unLike });
  };

  return (
    <>
      {!isClick ? (
        <div>
          <button onClick={addLikeHandler}>
            <img src={unLike} alt='' className='icon like' />
          </button>
          {like.count}
        </div>
      ) : (
        <div>
          <button onClick={unLikeHandler}>
            <img src={addLike} alt='' className='icon like' />
          </button>
          {like.count}
        </div>
      )}
    </>
  );
}
export default Like;
