import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { useParams } from 'react-router-dom'


class AddPayment extends React.Component<{type: string, expenseId: string|undefined},{description : string|undefined, amount: number|null}>{
  
    constructor(props: {type: string, expenseId: string|undefined}) {
        super(props);
        this.state = {
            description: undefined,
            amount: null
          };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { id, value } = event.target;
      if (id === 'description'){
          this.setState({description: value});
      }

      if (id === 'amount'){
          this.setState({amount: parseFloat(value)});
      }
    }
      
    handleSubmit(event:  React.FormEvent<HTMLFormElement>) {
        console.log("Saving transaction",this.state);
        this.saveToWs();
        event.preventDefault();
      }

    saveToWs(){
      const cookies = new Cookies();
      cookies.set('mycookie','valor',{ path: '/' });
      console.log(cookies.get("jwt-token"));
      // Set your JWT token in the headers
      const jwtToken = cookies.get("jwt-token"); // Replace with your actual JWT token
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      const transaction = {
          description: this.state.description,
          amount: this.state.amount!,
          currency: 'ARS',
          date: '2023-06-06T00:00:00Z'
        };    
      UserControllerApiFactory().postTransactions(transaction);
    }
      
render() {
  return (
<div>
    <h4>Add Expense</h4>
    <form className="row g-3" onSubmit={this.handleSubmit}>
    <div className="mb-3 row">
    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="description" onChange={this.handleChange}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Amount</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="amount" onChange={this.handleChange}/>
    </div>
  </div>
    <div className="mb-3 row">
        <button type="submit" className="btn btn-primary mb-3">Save</button>
    </div>
    </form>
</div>
  );
}
}
export default AddPayment;