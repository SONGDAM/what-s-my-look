import { selector, selectorFamily } from 'recoil';

export const getImageApi = selector({
  key: 'getImageApi',
  get: async () => {
    const res = await fetch(
      `https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json`
    );
    return res.json();
  },
});

export const getWeatherApi = selectorFamily({
  key: 'getWeatherApi',
  get: (position) => async () => {
    const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const res = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    return res.json();
  },
});
