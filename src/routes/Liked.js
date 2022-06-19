import { signOut } from 'firebase/auth';
import { auth } from '../components/firebase';
//import { useNavigate } from 'react-router';
import { modalState } from '../recoil/modalState';
import { useSetRecoilState } from 'recoil';

function Liked() {
  const handleModal = useSetRecoilState(modalState);

  // const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(alert('logout!'));
    localStorage.removeItem('recoil-persist');

    //navigate('/');
    handleModal((prev) => !prev);
    window.location.href = 'http://localhost:3000/';
    document.body.style.overflow = 'unset';
  };

  return (
    <div>
      <div>hello</div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Liked;
