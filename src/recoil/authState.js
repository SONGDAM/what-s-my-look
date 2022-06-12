import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const authState = atom({
  key: 'authState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});

export default authState;
