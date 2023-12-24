import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';


class AddPayment extends React.Component<any,{description : string|undefined, amount: number|null}>{
  
    constructor(props: any) {
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
    <div className="col-auto">
        <label className="visually-hidden">Description</label>
        <input type="text" className="form-control" id="description" placeholder="Description" onChange={this.handleChange}/>
    </div>
    <div className="col-auto">
        <label className="visually-hidden">Amount</label>
        <input type="text" className="form-control" id="amount" placeholder="Amount" onChange={this.handleChange}/>
    </div>
    <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3">Save</button>
    </div>
    </form>
</div>
  );
}
}
export default AddPayment;