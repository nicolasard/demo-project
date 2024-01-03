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
    <MonthlyStats/>
    <HomePayments/>
</div>
  );
}

export default Home;
