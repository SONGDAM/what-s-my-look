import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/icon/logo.svg';
import { useRecoilValue } from 'recoil';
import authState from '../recoil/authState';

function NavBar() {
  const [isNavOn, setIsNavOn] = useState(false);
  const authedUser = useRecoilValue(authState);

  const handleNav = () => {
    if (window.scrollY > 500) {
      setIsNavOn(true);
    } else if (window.scrollY < 200) {
      setIsNavOn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleNav);
    return () => {
      window.removeEventListener('scroll', handleNav);
    };
  }, []);

  return (
    <div>
      <div className={isNavOn ? 'nav-actived' : 'none'}>
        <div className='nav-title'>
          <img src={logo} alt='' />
        </div>

        <div className='nav-content'>
          <span>{authedUser?.nickName}</span>
          <Link to='/liked'>
            <span>Liked</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
