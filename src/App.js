import './styles/App.css';
import WeatherInfo from './components/WeatherInfo';

function App() {
  return (
    <div>
      <div className='title-content'>
        <p>what &#39;s my look?</p>

        <div className='weather-info'>
          <WeatherInfo />
        </div>
      </div>
    </div>
  );
}

export default App;
