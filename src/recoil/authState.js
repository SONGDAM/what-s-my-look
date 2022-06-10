import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: null,
  // TypeError: Cannot freeze 방지
  dangerouslyAllowMutability: true,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export default authState;
