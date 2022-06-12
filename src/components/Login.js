import { auth } from '../components/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import google from '../assets/icon/google-login.png';
import { useRecoilState } from 'recoil';
import authState from '../recoil/authState';
// import { useNavigate } from 'react-router';

function Login() {
  // const navigate = useNavigate();
  const [authedUser, setAuth] = useRecoilState(authState);

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      const user = {
        email: result.user.email,
        nickName: result.user.displayName,
        photo: result.user.photoURL,
      };

      setAuth(user);

      console.log(user);
    });
  };

  console.log(authedUser);

  const logout = () => {
    signOut(auth).then(alert('logout!'));
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
