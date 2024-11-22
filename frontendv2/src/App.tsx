import React from 'react';
import './App.css';
import Navbar from './modules/Navbar';
import Home from './modules/Home';
import MyAccount from './modules/MyAccount';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from './modules/Login';
import AddPayment from './modules/AddPayment';
import Summary from './modules/Summary';

function App() {
  const cookies = new Cookies();
  const auth = cookies.get('jwt-token');

  return (
    <React.StrictMode>
      <Router>
        <AppLayout auth={auth} />
      </Router>
    </React.StrictMode>
  );
}

function AppLayout({ auth }: { auth: string | undefined }) {
  const location = useLocation();

  // Determine if Navbar should be shown
  const showNavbar = location.pathname !== '/login';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/expense/:type/:expenseId?" element={<AddPayment />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
