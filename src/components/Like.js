import unLike from '../assets/icon/empty-heart.png';
import addLike from '../assets/icon/full-heart.png';
import '../styles/like.css';
import { useReducer, useState } from 'react';
import axios from 'axios';

const initialState = {
  count: 0,
  likes: [],
};

const ACTION_TYPE = {
  addLike: 'addLike',
  unLike: 'unLike',
};

const email = 'aa@aa.com';

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

function Like({ imageName }) {
  console.log(imageName);
  const [like, dispatch] = useReducer(reducer, initialState);
  const [isClick, setIsClick] = useState(false);

  const addLikeHandler = (e) => {
    console.log(e.target.imageName);
    // setIsClick(true);
    // dispatch({ type: ACTION_TYPE.addLike });

    postLike();
  };

  //좋아요
  const postLike = async () => {
    await axios
      .post('/api/like', {
        id: email,
        imageName: '20_1_r',
      })
      .then((res) => console.log(res.data));
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
