import React from 'react';
import HomePayments from './HomePayments';
import AddPayment from './AddPayment';
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
 return (
<div>
    <h3>Welcome to Servus payments!</h3>
    <button onClick={ () => navigate('/expense/new') } type="button" className="btn btn-primary" >Add Payment</button>
    <HomePayments/>
</div>
  );
}

export default Home;
