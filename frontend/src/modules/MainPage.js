import React from 'react';
import MyInfo from './MyInfo.js'
import Home from './Home.js'
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

class MainPage extends React.Component {

  render() {
    return (
    <React.StrictMode>
        <Router>
    <div className="container" >
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <a className="navbar-brand" href="#">Servus</a>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
               </button>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav mr-auto">
                   <li className="nav-item">
                     <a className="nav-link" href={'/'}>Home</a>
                   </li>
                   <li className="nav-item">
                     <a className="nav-link" href={'/myInfo'}>My Profile</a>
                   </li>
                 </ul>
               </div>
           </nav>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/myInfo" element={<MyInfo />} />
           </Routes>
        </div>
        </Router>
          </React.StrictMode>);
  }
}

export default MainPage;