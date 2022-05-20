import '../styles/Look.css';
// import fullHeart from '../assets/icon/full-heart.png';
import emptyHeart from '../assets/icon/empty-heart.png';
import share from '../assets/icon/share.png';

function LookCard({ card }) {
  console.log('card', card);
  return (
    <div className='card-content'>
      <img src={card.src} className='image-item' />
      <div className='icon-wrapper'>
        <img src={emptyHeart} className='icon-item' />
        <img src={share} className='icon-item' />
      </div>
    </div>
  );
}

export default LookCard;
