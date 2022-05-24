import WeatherInfo from './WeatherInfo';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carousel.css';
import { titleItems } from './titleImage';

function Carousel() {
  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
    draggable: true,
    nextArrow: false,
  };

  return (
    <Slider {...settings} className='slick-slider'>
      {titleItems.map((image) => (
        <div key={image.id}>
          <div>
            <img src={image.src} alt={''} className='title-image' />
          </div>
          <div className='title-content'>
            <p>what&#8217;s my look?</p>
            <WeatherInfo key={image.id} />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
