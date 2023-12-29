import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import {FormattedMessage} from 'react-intl';

function Navbar() {

  const navigate = useNavigate()

  const logout = () =>{
    const cookies = new Cookies();
    cookies.remove('jwt-token');
    navigate('/');
    window.location.reload();
  }

  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#" onClick={()=>navigate('/')}>MyExpenses</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#" aria-current="page" onClick={()=>navigate('/')}><FormattedMessage id = "app.header_expenses"/></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={()=>navigate('/myAccount')}><FormattedMessage id = "app.header_account"/></a>
        </li>
      </ul>
      <ul className="navbar-nav">
        <li>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
