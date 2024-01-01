import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { useNavigate } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const HomePayments = () => {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      console.log('Getting transactions...');
      const cookies = new Cookies();
      console.log(cookies.get('jwt-token'));

      const jwtToken = cookies.get('jwt-token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;

      const response = await UserControllerApiFactory().getTransactionsPage();
      if (response.status === 200) {
        console.log(response.data);
        setTransactions(response.data);
      }
    } catch (error) {
      //console.log(error.response.data);
      // Handle errors or trigger an event to show errors
    }
  };

  const deleteTransaction = async (transaction: Transaction) => {
    try {
      console.log('Deleting', transaction);
      console.log('Getting transactions...');

      const cookies = new Cookies();
      cookies.set('mycookie', 'valor', { path: '/' });
      console.log(cookies.get('jwt-token'));

      const jwtToken = cookies.get('jwt-token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;

      await UserControllerApiFactory().deleteTransactions(transaction);
      getTransactions();
    } catch (error) {
      //console.log(error.response.data);
      // Handle errors or trigger an event to show errors
    }
  };

  const parseDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString();
  };

  const goEdit = (transaction: Transaction) => {
    navigate('expense/edit/'+ transaction.id);
  }

  const formatDate = (date: string) => {
    const options:Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('de',options);
  };

  return (
    <div>

      <div>

      {transactions.map((transaction, index) => { 
        const transactionDay = formatDate(transaction.date);
        const isFirstTransactionOfDay = index === 0 || transactionDay !== formatDate(transactions[index - 1].date);
        
        return (
          <div key={transactionDay}>
            {isFirstTransactionOfDay && (
              <div className="mb-2">
                <strong>{transactionDay.toLocaleUpperCase()}</strong>
              </div>
            )}

            <div className="card p-0 trans-list " style={{ marginBottom: 10}} onClick={() => goEdit(transaction)}>
              <div className="card-body" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className="row" style={{ padding: 0 }}>
                  <div className="col-auto">
                    <div className="p-0">
                      
                    </div>
                  </div>
                  <div className="col d-flex align-items-center">
                    <div className="p-0">
                      <div>{transaction.description}</div>
                      <div className='font-weight-light' style={{color: '#99979c'}}>Category</div>
                    </div>
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <div className="p-0">
                      <div style={{ fontSize: 16.2 }}>{transaction.amount} €</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
  </div>
     </div>
  );
};

export default HomePayments;
