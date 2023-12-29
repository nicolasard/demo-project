import React from 'react';
import HomePayments from './HomePayments';
import AddPayment from './AddPayment';
import { useNavigate } from "react-router-dom"
import MonthlyStats from './MonthlyStats';
import {FormattedMessage} from 'react-intl';

function Home() {

 const navigate = useNavigate()
  
 return (
<div id='content'>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
        <button onClick={ () => navigate('/expense/new') } type="button" className="btn btn-primary" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"></path>
</svg> <FormattedMessage id = "app.header_add_expense"/></button>
        </div>
        <div className="col-sm-2">
          <p style={{fontSize:'larger'}}>??Month?? total: <b>$??.-</b></p>
        </div>
      </div>
    </div>
    <HomePayments/>
    <MonthlyStats/>
</div>
  );
}

export default Home;
