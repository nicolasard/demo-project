import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';


class HomePayments extends React.Component<any,{transactions:Transaction[]}>{
  
    constructor(props: any) {
        super(props);
        this.state = {transactions: []};
        this.getTransactions = this.getTransactions.bind(this);
      }

      componentDidMount(){
        this.getTransactions();
      }

      getTransactions(){
        console.log("getting transactions...");
        const cookies = new Cookies();
        cookies.set('mycookie','valor',{ path: '/' });
        console.log(cookies.get("jwt-token"));
        // Set your JWT token in the headers
        const jwtToken = cookies.get("jwt-token"); // Replace with your actual JWT token
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    
        UserControllerApiFactory().getTransactions().then((response)=>{
          if (response.status==200){
            console.log(response.data);
            this.setState({transactions: response.data});
          }
        });
      }

render() {
  return (
<div>
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
        {this.state.transactions.map(transaction => (
            <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>Cash</td>
            <td>{transaction.amount} {transaction.currency}</td>
            </tr>
        ))}
        </tbody>
    </table>
</div>
  );
}
}
export default HomePayments;