import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/icon/logo.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../recoil/authState';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import '../styles/Modal.css';
import { modalState } from '../recoil/modalState';

//import Modal from './Modal';

function NavBar() {
  const [isNavOn, setIsNavOn] = useState(false);
  const [isModalOn, setIsModalOn] = useRecoilState(modalState);
  const authedUser = useRecoilValue(authState);

  console.log(authedUser);

  const navigate = useNavigate();

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

  const validateUser = () => {
    if (authedUser === null && !localStorage.getItem('recoil-persist')) {
      setIsModalOn((prev) => !prev);
      document.body.style.overflow = 'hidden';
    }
    if (localStorage.getItem('recoil-persist')) {
      navigate('/liked');
      alert('환영합니다');
    }
  };

  return (
    <header>
      <div className={isNavOn ? 'nav-actived' : 'none'}>
        <div className='nav-title'>
          <img src={logo} alt='' />
        </div>
        <div className='nav-content'>
          {authedUser !== null ? null : (
            <span className='user-name'>{authedUser?.nickName}</span>
          )}
          <div onClick={validateUser}>Liked</div>

          <ModalPortal>{isModalOn && <Modal />}</ModalPortal>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
