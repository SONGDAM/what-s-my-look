import './styles/App.css';
// import WeatherInfo from './components/WeatherInfo';
import Carousel from './components/Carousel';

function App() {
  return (
    <>
      <div className='title-content'>
        <Carousel />
        {/* <p>what &#39;s my look?</p>
        <div className='weather-info'>
          <WeatherInfo />
        </div> */}
      </div>
    </>
  );
}

export default App;
