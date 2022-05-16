import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

function NavBar() {
  const [isNavOn, setIsNavOn] = useState(false);

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
          <h1>what &#8217;s my look?</h1>
        </div>

        <div className='nav-content'>
          <Link to='/liked'>
            <span>Liked</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
