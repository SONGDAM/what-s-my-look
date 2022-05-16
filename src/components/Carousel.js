import { useContext } from 'react';
import { ImageStateContext } from '../routes/Home';
import { titleImages } from './Images';
import WeatherInfo from './WeatherInfo';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carousel.css';

function Carousel() {
  const context = useContext(ImageStateContext);

  console.log(context);

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    lazyload: true,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    draggable: true,
    nextArrow: false,
  };

  return (
    <Slider {...settings} className='slick-slider'>
      {titleImages.map((image) => (
        <div key={image.id}>
          <div>
            <img src={image.src} alt={''} className='title-image' />
          </div>
          <div className='title-content'>
            <h1>what &#8217;s my look?</h1>
            <WeatherInfo key={image.id} />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
