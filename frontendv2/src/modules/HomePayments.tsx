import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { useNavigate } from "react-router-dom"

class HomePayments extends React.Component<any,{transactions:Transaction[]}>{
  
    constructor(props: any) {
        super(props);
        this.state = {transactions: []};
        this.getTransactions = this.getTransactions.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
      }

      componentDidMount(){
        this.getTransactions();
      }

      deleteTransaction(transaction: Transaction){
        console.log("Deleting", transaction);
        //This I need to make it more generic
        console.log("getting transactions...");
        const cookies = new Cookies();
        cookies.set('mycookie','valor',{ path: '/' });
        console.log(cookies.get("jwt-token"));
        // Set your JWT token in the headers
        const jwtToken = cookies.get("jwt-token"); // Replace with your actual JWT token
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        UserControllerApiFactory().deleteTransactions(transaction).then(
          (response) => {
            this.getTransactions();
          }
        );
      }

      getTransactions(){
        //This I need to make it more generic
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
        }).catch( e => console.log(e.response.data)); //Here I'm catching the exceptions. Later this component should trigger an event to show the errors
      }

parseDate(date: string){
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString();
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
            <th className="col"></th>
            </tr>
        </thead>
        <tbody>
        {this.state.transactions.map(transaction => (
            <tr key={transaction.id}>
            <td>{this.parseDate(transaction.date)}</td>
            <td>{transaction.description}</td>
            <td>Cash</td>
            <td>{transaction.amount} {transaction.currency}</td>
            <td>
            <button type="button" className="btn btn-primary" onClick={ () => console.log('not implemented')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
</svg>
            </button>
            <button type="button" className="btn btn-danger" onClick={ () => this.deleteTransaction(transaction)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
</svg>
              </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
</div>
  );
}
}
export default HomePayments;