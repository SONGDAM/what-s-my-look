import { auth } from '../components/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        localStorage.setItem('JWT', token);
        alert('you logined!');
      })
      .catch((e) => console.log(e));
  };

  const signUpWithNaver = () => {};
  const signUpWithKakao = () => {};

  const logout = () => {
    console.log('you logouted!');
  };

  return (
    <div>
      <button onClick={signUpWithGoogle}>signUpWithGoogle</button>
      <button onClick={logout}>logout</button>
      <button onClick={signUpWithNaver}>signUpWithNaver</button>
      <button onClick={signUpWithKakao}>signUpWithkakao</button>
    </div>
  );
}

export default Login;
