import { auth } from '../components/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import google from '../assets/icon/google-login.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authState, isLoggedInState } from '../recoil/authState';

// import { useNavigate } from 'react-router';

function Login() {
  // const navigate = useNavigate();
  const [authedUser, setAuth] = useRecoilState(authState);
  const isLoggedIn = useSetRecoilState(isLoggedInState);

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      const user = {
        email: result.user.email,
        nickName: result.user.displayName,
        photo: result.user.photoURL,
      };

      setAuth(user);
      isLoggedIn(true);

      console.log(user);
    });
  };

  console.log(authedUser);

  const logout = () => {
    signOut(auth).then(alert('logout!'));
    //recoil-persist 적용돼서 로컬에 계속 남아있기때문에 안없애면 로그아웃해도 유저정보 계속 뜸
    localStorage.removeItem('recoil-persist');
    isLoggedIn(false);
  };

  return (
    <div>
      <button onClick={signUpWithGoogle}>
        <img src={google} alt='' />
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Login;
