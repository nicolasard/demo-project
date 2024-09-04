import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import ApiClient from './common/ApiClient';



const HomePayments = () => {

  const navigate = useNavigate();

  const intl = useIntl();

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      ApiClient.setupAxiosHeaders();
      const response = await UserControllerApiFactory().getTransactionsPage(month,year);
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
      ApiClient.setupAxiosHeaders();
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
    return new Date(date).toLocaleDateString(intl.locale,options);
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
                  <div className="col-auto d-flex align-items-center">
                    <div className="p-0">
                              <div style={{
                      width: 40, // Adjust size as needed
                      height: 40, // Adjust size as needed
                      backgroundColor: '#f0f0f0', // Adjust color as needed
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#808080" className="bi bi-bootstrap-reboot" viewBox="0 0 16 16">
                      <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.8 6.8 0 0 0 1.16 8z"/>
                      <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324z"/>
                    </svg>
                     </div>
                    </div>
                  </div>
                  <div className="col d-flex align-items-center">
                    <div className="p-0">
                      <div>{transaction.description}</div>
                      <div className='font-weight-light' style={{color: '#99979c'}}>{transaction.category? transaction.category.categoryName : 'Unknow category'}</div>
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
