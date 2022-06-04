import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Home from './routes/Home';
import Liked from './routes/Liked';
import axios from 'axios';

export const getUserContext = createContext([]);

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      await axios
        .get('/api/get/user')
        .then((res) => res.data)
        .then((data) => setUser(data));
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <getUserContext.Provider value={user}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/liked' element={<Liked />} />
        </Routes>
      </getUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
