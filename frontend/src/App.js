import './App.css';
import LoginPage from './modules/LoginPage.js'
import MainPage from './modules/MainPage.js'

function App() {

  if(getCookie('jwt-token')){
    return (
    <div className="App">
        <MainPage/>
    </div>
    );
  }
  return (
    <div className="App">
       <LoginPage/>
    </div>
  );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default App;
