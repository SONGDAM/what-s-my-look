import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: 'what-s-my-look.web.app',
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: 'what-s-my-look',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { storage, app, database, auth };
