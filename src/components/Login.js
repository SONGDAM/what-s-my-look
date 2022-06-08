import { auth } from '../components/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import google from '../assets/icon/google-login.png';
import { useState, useEffect } from 'react';

function Login() {
  const [userData, setUserData] = useState(null);
  const [, setUserInfoState] = useState(null);
  // 작성 코드

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
      })
      .catch((e) => console.warn(e));
  };

  const currentUser = auth.currentUser;

  useEffect(() => {
    const handleUserInfo = () => {
      setUserInfoState(currentUser);
    };
    handleUserInfo();
  }, [currentUser]);

  // const displayName = currentUser.displayName;
  // const email = currentUser.email;
  // const photoURL = currentUser.photoURL;
  // const emailVerified = currentUser.emailVerified;
  // const uid = currentUser.uid;

  return (
    <div>
      <button onClick={signUpWithGoogle}>
        <img src={google} alt='' />
      </button>
      {userData ? userData.displayName : null}
    </div>
  );
}

export default Login;
