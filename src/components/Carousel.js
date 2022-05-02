import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { items } from './items';

function Carousel() {
  const settings = {
    autoplay: false,
    dots: true,
    lazyload: true,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: 0,
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={items[0].src} />
      </div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Slider>
  );
}

export default Carousel;
