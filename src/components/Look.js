import { ImageStateContext } from '../routes/Home';
import { useContext, useState } from 'react';

function Look() {
  const lookList = ['All', 'casual', 'modern', 'street', 'romantic'];
  const images = useContext(ImageStateContext);
  const [imgArray, setImgArray] = useState([]);
  const handleImages = Object.values(images);

  const onClick = (e) => {
    const lookName = e.target.textContent;
    const result = handleImages.filter((image) => image.look === lookName);
    setImgArray(result);
  };

  return (
    <>
      <div>
        {lookList.map((item, idx) => (
          <button key={idx} onClick={onClick} className='look-button'>
            {item}
          </button>
        ))}
      </div>
      <div>
        {imgArray.map((item, idx) => (
          <img src={item.src} key={idx} />
        ))}
      </div>
    </>
  );
}

export default Look;
