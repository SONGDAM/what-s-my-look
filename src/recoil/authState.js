import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: 'authState',
  default: null,
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom({
  key: 'tokenState',
  default: '',
});
