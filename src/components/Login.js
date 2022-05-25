import { auth } from '../components/firebase';
// import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { useNavigate } from 'react-router';
function Login() {
  // const [userToken, setUserToken] = useState('');

  // const navigate = useNavigate();

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        localStorage.setItem('JWT', token);
      })
      .catch((e) => console.log(e));
  };

  // console.log(userToken);

  const signUpWithNaver = () => {};
  const signUpWithKakao = () => {};

  return (
    <div>
      <button onClick={signUpWithGoogle}>signUpWithGoogle</button>
      <button onClick={signUpWithNaver}>signUpWithNaver</button>
      <button onClick={signUpWithKakao}>signUpWithkakao</button>
    </div>
  );
}

export default Login;
