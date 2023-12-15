import React from 'react';

function Home() {
  return (
<div>
    <h3>Welcome to Servus payments!</h3>
    <button type="button" className="btn btn-primary" >Add Payment</button>
    <table className="table">
        <thead>
            <tr>
            <th className="col">Date</th>
            <th className="col">Description</th>
            <th className="col">Pay. Method</th>
            <th className="col">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>12.12.2023</td>
            <td>Butter at rewe</td>
            <td>Cash</td>
            <td>102.3</td>
            </tr>
            <tr>
            <td>12.12.2023</td>
            <td>New jacket</td>
            <td>Visa Debit</td>
            <td>23.4</td>
            </tr>
            <tr>
            <td>12.12.2023</td>
            <td>Dinner with friends</td>
            <td>Commerzbank Visa Debit</td>
            <td>432.3</td>
            </tr>
        </tbody>
    </table>
</div>
  );
}

export default Home;
