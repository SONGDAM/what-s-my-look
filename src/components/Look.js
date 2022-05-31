import { ImageStateContext } from '../routes/Home';
import { weatherStateContext } from '../routes/Home';
import { useContext, useState, useEffect } from 'react';
import '../styles/Look.css';
import Like from './Like';
import Share from './Share';

function Look() {
  const lookList = ['casual', 'modern', 'street', 'romantic'];
  const images = useContext(ImageStateContext);
  const temp = useContext(weatherStateContext);
  const [nowTemp, setNowTemp] = useState(17);
  const [imgArray, setImgArray] = useState([]);
  const [isClick, setIsClick] = useState(false);

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

  const defaultArray = images.filter((item) => item.temperature === nowTemp);

  const onClick = (e) => {
    const buttonName = e.target.textContent;
    const result = images.filter(
      (image) => image.look === buttonName && image.temperature === nowTemp
    );
    setImgArray(result);
    setIsClick(true);
  };

  const test = (e) => {
    console.log(e.target.imageName);
  };

  return (
    <>
      <div className='filter'>
        {lookList.map((item, idx) => (
          <button
            key={idx}
            id={idx}
            onClick={onClick}
            className='filter-button'
          >
            {item}
          </button>
        ))}
      </div>
      <div className='card'>
        {isClick
          ? imgArray.map((item, idx) => (
              <div key={idx}>
                <img src={item.path} key={idx} className='image' />
                <div className='icon-wrapper'>
                  <Like imageName={item.name} test={test} />
                  <Share />
                </div>
              </div>
            ))
          : defaultArray.map((item, idx) => (
              <div key={idx}>
                <img src={item.path} key={idx} className='image' />
                <div className='icon-wrapper'>
                  <Like imageName={item.name} onClick={test} />
                  <Share />
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Look;
