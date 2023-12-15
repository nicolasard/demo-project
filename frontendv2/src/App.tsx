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

function App() {
  return (
    <React.StrictMode>
      <Router>
        <div>
          <Navbar/>
          <Routes>
              <Route path="/myAccount"  element={<MyAccount/>}/>
              <Route path="/"  element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
