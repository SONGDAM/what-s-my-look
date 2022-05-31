// import { auth } from '../components/firebase';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    navigate('/api/login/google');
  };

  const logout = () => {
    console.log('you logouted!');
  };

  return (
    <div>
      <button onClick={loginWithGoogle}>signUpWithGoogle</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Login;
