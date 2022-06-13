import { atom, selector } from 'recoil';

//파이어베이스에서 이미지 가져오기
export const getImageApi = selector({
  key: 'getImageApi',
  get: async () => {
    const res = await fetch(
      `https://what-s-my-look-default-rtdb.firebaseio.com/database/look.json`
    );
    return res.json();
  },
});

//Home에서 lat, lon 받아오기
export const getCurrentPosition = atom({
  key: 'getCurrentPosition',
  default: { lat: '', lon: '' },
});

//Home에서 받아온 lat, lon 으로 날씨API 가져오기
export const getWeatherApi = selector({
  key: 'getWeatherApi',
  get: async ({ get }) => {
    const position = get(getCurrentPosition);

    const API_KEY = `6e3fd9c6824107fd354f165491f18092`;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_KEY}&units=metric`
    );

    return res.json();
  },
});
