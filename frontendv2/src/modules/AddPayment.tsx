import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Category } from './generated-api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
const AddPayment = () => {

  //Hooks area 
  const navigate = useNavigate();

  const params= useParams()

  const [formData, setFormData] = useState<{ description: string | undefined; amount: number | null ,
     transactionId: number | null, date: Date | null, categoryId: number | undefined }>({
    description: undefined,
    amount: null,
    transactionId: null,
    categoryId: undefined,
    date: new Date(Date.now())
  });

  const [categories, setCategories] = useState<{ category: Category[]}>({
    category: []
  });

  useEffect(() => {
    if (params.type === "edit"){
      getExpenseData(Number(params.expenseId))
    }else {
      const cookies = new Cookies();
      console.log(cookies.get('jwt-token'));
      // Set your JWT token in the headers
      const jwtToken = cookies.get('jwt-token'); // Replace with your actual JWT token
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;
      UserControllerApiFactory().getCategories().then( (response)=> {
        setCategories({category: response.data})
      });
    }
  }, []);

  const getExpenseData = (expenseId: number) => {
    const cookies = new Cookies();
    console.log(cookies.get('jwt-token'));
    // Set your JWT token in the headers
    const jwtToken = cookies.get('jwt-token'); // Replace with your actual JWT token
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;

    const transaction = {
      description: formData.description,
      amount: formData.amount!,
      currency: 'ARS',
      date: getDate(),
    };

    UserControllerApiFactory().getCategories().then( (response)=> {
      setCategories({category: response.data})
    });

    UserControllerApiFactory().getTransaction(expenseId).then( (response) => {
      setFormData({ description: response.data.description,amount: response.data.amount , transactionId : response.data.id!,date: new Date(response.data.date), categoryId: response.data.category?.categoryId});
    });
    
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'amount' ? parseFloat(value) : value,
      [id]: id === 'date' ? new Date(value) : value ,
    }));
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'categoryId' ? parseInt(value) : value,
    }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Saving transaction', formData);
    saveToWs();
    event.preventDefault();
  };

  const deletePayment = ()=> {
    console.log("Deleting transaction "+ formData.transactionId);
  
    const cookies = new Cookies();
    console.log(cookies.get('jwt-token'));
    // Set your JWT token in the headers
    const jwtToken = cookies.get('jwt-token'); // Replace with your actual JWT token
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;
    const transaction = {
      id: formData.transactionId!,
      description: formData.description,
      amount: formData.amount!,
      currency: 'ARS',
      date: (new Date(formData.date!)).toISOString()!,
    };

    UserControllerApiFactory().deleteTransactions(transaction).then((response) => {
      navigate('/');
    });  
  }

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
    axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;

    const transaction = {
      id: formData.transactionId!,
      description: formData.description,
      amount: formData.amount!,
      category: { categoryId: formData.categoryId},
      currency: 'ARS',
      date: (new Date(formData.date!)).toISOString()!,
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
        <h4><FormattedMessage id = "app.header_edit_expense"/></h4>
      }
      {params.type === "new" && 
        <h4><FormattedMessage id = "app.header_add_expense"/></h4>
      }
      <div style={{ paddingTop: 30}}>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">
          <FormattedMessage id = "app.description"/>
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="description" value={formData.description} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="amount" className="col-sm-2 col-form-label">
          <FormattedMessage id = "app.amount"/>
          </label>
          <div className="col-sm-10">
            <input type="number" step="0.01" className="form-control" id="amount" value={formData.amount!} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="category" className="col-sm-2 col-form-label">
          <FormattedMessage id = "app.category"/>
          </label>
          <div className="col-sm-10">
          <select className="form-select" aria-label="Default select example" id="categoryId" value={formData.categoryId} onChange={handleChangeSelect} >
            <option selected>Open this select menu</option>
            {categories.category.map((value)=> (
              <option value={value.categoryId}>{value.categoryName}</option>
            )
            )}
          </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputDate" className="col-sm-2 col-form-label">
          <FormattedMessage id = "app.date"/>
          </label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="date"  value={formData.date?.toISOString().split('T')[0]!} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <button type="submit" className="btn btn-primary mb-3">
            Save
          </button>
        </div>
        {params.type === "edit" && 
        <div className="mb-3 row">
        <button type="button" className="btn btn-danger mb-3" onClick={deletePayment} >
            Delete
          </button>
        </div>
        }
      </form>
    </div>
    </div>
  );
};

export default AddPayment;
