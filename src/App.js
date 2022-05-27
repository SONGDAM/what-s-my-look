import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Liked from './routes/Liked';

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
