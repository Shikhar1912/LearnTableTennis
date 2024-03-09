
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const signInState = atom({
  key: 'signInState',
  default: {
    signedIn: false,
    username: '',
  },
  effects_UNSTABLE: [persistAtom], // Attach the persistAtom effect
});
