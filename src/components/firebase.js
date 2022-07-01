import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAoncO2Mf0Hj0aN7VsQ9nMMN4P9Xkb95Sc',
  authDomain: 'what-s-my-look.firebaseapp.com',
  databaseURL: 'https://what-s-my-look-default-rtdb.firebaseio.com',
  projectId: 'what-s-my-look',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { storage, app, database, auth };
