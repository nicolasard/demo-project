import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';

function App() {

  if(getCookie('jwt-token')){
    return (
    <div className="App">
    <h2>You are logged</h2>
    </div>
    );
  }
  return (
    <div className="App">
    <h2>Welcome to the demo app</h2>

    <GoogleLogin
      onSuccess={credentialResponse => {
        document.cookie = 'jwt-token='+credentialResponse.credential;
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
    </div>
  );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default App;
