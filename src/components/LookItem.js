import '../styles/Look.css';
// import fullHeart from '../assets/icon/full-heart.png';
import emptyLike from '../assets/icon/empty-heart.png';
import fullLike from '../assets/icon/full-heart.png';
import share from '../assets/icon/share.png';
import { useReducer } from 'react';

// const trueLike = <img src={fullLike} className='icon-item' />;
// const falseLike = <img src={emptyLike} className='icon-item' />;

const initialState = {
  count: 0,
  likes: [],
};

console.log(initialState);
const reducer = (state, action) => {
  console.log('되나', state, action);
  // console.log('되나2', state.likes[0].id);
  switch (action.type) {
    case 'addLike':
      return {
        count: state.count + 1,
        likes: [
          ...state.likes,
          {
            id: Date.now(),
            isClick: true,
          },
        ],
      };
    case 'deleteLike':
      return {
        count: state.count - 1,
        likes: state.likes.filter((likes) => likes.id !== action.payload.id),
      };
    default:
      return initialState;
  }
};

function LookCard({ card }) {
  const [like, dispatch] = useReducer(reducer, initialState);
  console.log(like);
  return (
    <div className='card-content'>
      <img src={card.src} className='image' />
      <div className='icon-wrapper'>
        {/* <img src={emptyHeart} className='icon-item' /> */}
        <button
          className='likeButton'
          onClick={() => {
            dispatch({ type: 'addLike' });
          }}
        >
          <img src={fullLike} alt='' className='icon-item' />
        </button>
        <button
          className='likeButton'
          onClick={() => {
            dispatch({ type: 'deleteLike' });
          }}
        >
          <img src={emptyLike} alt='' className='icon-item' />
        </button>

        {like.count}
        <img src={share} className='icon-item' />
      </div>
    </div>
  );
}

export default LookCard;
