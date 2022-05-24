import { ImageStateContext } from '../routes/Home';
import { weatherStateContext } from '../routes/Home';
import { useContext, useState, useEffect } from 'react';

function Look() {
  const lookList = ['All', 'casual', 'modern', 'street', 'romantic'];
  const images = useContext(ImageStateContext);
  const temp = useContext(weatherStateContext);
  const [imgArray, setImgArray] = useState([]);
  const [nowTemp, setNowTemp] = useState(17);
  const handleImages = Object.values(images);

  useEffect(() => {
    if (temp >= 23 && temp < 28) {
      setNowTemp(23);
      return;
    }
    if (temp >= 20 && temp <= 22) {
      setNowTemp(20);
      return;
    }
    if (temp >= 17 && temp <= 19) {
      setNowTemp(17);
      return;
    }
    if (temp >= 12 && temp <= 16) {
      setNowTemp(12);
      return;
    }
    if (temp >= 9 && temp <= 11) {
      setNowTemp(9);
      return;
    }
    if (temp >= 5 && temp <= 8) {
      setNowTemp(5);
      return;
    }
    if (temp <= 4) {
      setNowTemp(4);
      return;
    }
  }, [temp]);

  const onClick = (e) => {
    const lookName = e.target.textContent;
    const result = handleImages.filter(
      (image) => image.look === lookName && image.temperature === nowTemp
    );
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
