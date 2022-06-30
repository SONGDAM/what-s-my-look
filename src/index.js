import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Liked from './routes/Liked';
import { Suspense } from 'react';
import Loading from './components/Loading';

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/liked' element={<Liked />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
  </HashRouter>,
  document.getElementById('root')
);
