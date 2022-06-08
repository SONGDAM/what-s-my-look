import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import Home from './routes/Home';
import Liked from './routes/Liked';

export const getUserContext = createContext([]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/liked' element={<Liked />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
