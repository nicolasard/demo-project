import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory } from './generated-api/api';
import { useParams, useNavigate } from 'react-router-dom';

const AddPayment = () => {

  //Hooks area 
  const navigate = useNavigate();

  const params= useParams()

  const [formData, setFormData] = useState<{ description: string | undefined; amount: number | null , transactionId: number | null}>({
    description: undefined,
    amount: null,
    transactionId: null
  });

  useEffect(() => {
    if (params.type === "edit"){
      getExpenseData(Number(params.expenseId))
    }
  }, []);

  const getExpenseData = (expenseId: number) => {
    const cookies = new Cookies();
    console.log(cookies.get('jwt-token'));
    // Set your JWT token in the headers
    const jwtToken = cookies.get('jwt-token'); // Replace with your actual JWT token
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    const transaction = {
      description: formData.description,
      amount: formData.amount!,
      currency: 'ARS',
      date: getDate(),
    };

    UserControllerApiFactory().getTransaction(expenseId).then( (response) => {
      setFormData({ description: response.data.description,amount: response.data.amount , transactionId : response.data.id!});
    });
    
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Saving transaction', formData);
    saveToWs();
    event.preventDefault();
  };

  const getDate = () => {
    const date = Date.now();
    const date2 = new Date(date);
    return date2.toISOString();
  };

  const saveToWs = () => {
    const cookies = new Cookies();
    console.log(cookies.get('jwt-token'));
    // Set your JWT token in the headers
    const jwtToken = cookies.get('jwt-token'); // Replace with your actual JWT token
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    const transaction = {
      id: formData.transactionId!,
      description: formData.description,
      amount: formData.amount!,
      currency: 'ARS',
      date: getDate(),
    };

    if (params.type==="edit"){
      UserControllerApiFactory().putTransactions(transaction).then((response) => {
        navigate('/');
      });  
    }
    if (params.type==="new"){
      UserControllerApiFactory().postTransactions(transaction).then((response) => {
        navigate('/');
      });
  
    }
  };
  
  return (
    <div id="content">
      {params.type === "edit" && 
        <h4>Edit Expense</h4>
      }
      {params.type === "new" && 
        <h4>Add Expense</h4>
      }
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="description" value={formData.description} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Amount
          </label>
          <div className="col-sm-10">
            <input type="number" step="0.01" className="form-control" id="amount" value={formData.amount!} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <button type="submit" className="btn btn-primary mb-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
