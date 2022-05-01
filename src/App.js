import './styles/App.css';
//import WeatherInfo from './components/WeatherInfo';
import Carousel from './components/Carousel';

function App() {
  return (
    <div>
      <div className='title-content'>
        {/* <p>what &#39;s my look?</p> */}
        <Carousel />
        <div className='weather-info'>{/* <WeatherInfo /> */}</div>
      </div>
    </div>
  );
}

export default App;
