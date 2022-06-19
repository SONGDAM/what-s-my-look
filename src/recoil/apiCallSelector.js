import { selector } from 'recoil';

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
