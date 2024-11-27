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
  Navigate,
} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from './modules/Login';
import AddPayment from './modules/AddPayment';
import Summary from './modules/Summary';
import CreateAccount from './modules/security/CreateAccount';
import ForgotPassword from './modules/security/ForgotPassword';

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
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot-password';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/myAccount"
          element={<ProtectedRoute auth={auth}><MyAccount /></ProtectedRoute>}
        />
        <Route
          path="/summary"
          element={<ProtectedRoute auth={auth}><Summary /></ProtectedRoute>}
        />
        <Route
          path="/expense/:type/:expenseId?"
          element={<ProtectedRoute auth={auth}><AddPayment /></ProtectedRoute>}
        />
        <Route
          path="/"
          element={<ProtectedRoute auth={auth}><Home /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({
  auth,
  children,
}: {
  auth: string | undefined;
  children: React.ReactNode;
}) {
  if (!auth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the child component if authenticated
  return <>{children}</>;
}

export default App;
