import React from 'react';
import HomePayments from './HomePayments';
import AddPayment from './AddPayment';

function Home() {
  return (
<div>
    <h3>Welcome to Servus payments!</h3>
    <button type="button" className="btn btn-primary" >Add Payment</button>
    <AddPayment/>
    <HomePayments/>
</div>
  );
}

export default Home;
