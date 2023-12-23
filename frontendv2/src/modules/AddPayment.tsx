import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';


class AddPayment extends React.Component<any,{transaction : Transaction|null}>{
  
    constructor(props: any) {
        super(props);
        this.state = {
            transaction: null
          };
      }

    handleSubmit(formData: string) {
        console.log("Saving transaction",this.state.transaction);
      }
      
render() {
  return (
<div>
    <h4>Add payment</h4>
    <form className="row g-3">
    <div className="col-auto">
        <label className="visually-hidden">Description</label>
        <input type="text" className="form-control" id="description" placeholder="Description" value={this.state.transaction?.description}/>
    </div>
    <div className="col-auto">
        <label className="visually-hidden">Amount</label>
        <input type="text" className="form-control" id="amount" placeholder="Amount" value={this.state.transaction?.amount}/>
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