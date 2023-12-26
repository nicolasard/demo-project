import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './modules/Navbar';
import Home from './modules/Home';
import MyAccount from './modules/MyAccount';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Cookies from 'universal-cookie';
import Login from './modules/Login';
import AddPayment from './modules/AddPayment';

function App() {

  const cookies = new Cookies();
  const auth = cookies.get('jwt-token');
  if (auth==null){
    return (<div><Login/></div>)
  }
  return (
    <React.StrictMode>
      <Router>
        <div>
          <Navbar/>
          <Routes>
              <Route path="/myAccount"  element={<MyAccount/>}/>
              <Route path="/expense/:type/:expenseId?"  element={<AddPayment/>}/>
              <Route path="/"  element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
