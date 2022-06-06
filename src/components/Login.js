// import { auth } from '../components/firebase';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    navigate('http://localhost:8080/auth/google');
  };

  const logout = () => {
    console.log('you logouted!');
  };

  const login = 'http://localhost:8080/auth/google';
  return (
    <div>
      <button onClick={loginWithGoogle}>signUpWithGoogle</button>
      <a href={login}>login</a>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Login;
