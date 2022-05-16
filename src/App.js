import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Liked from './routes/Liked';
import { database } from './components/firebase';

function App() {
  console.log(database);
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
