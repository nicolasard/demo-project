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

  const getClassName = (category: any): string => {
      switch (category) {
      case 'Services':
        return 'bi bi-bootstrap-reboot';
      case 'Leisure':
        return 'bi bi-cup-straw';
      default:
        return 'bi bi-question';
    }
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
                      width: 40, // Circle size
                      height: 40, // Circle size
                      backgroundColor: '#f0f0f0', // Background color
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <i className={getClassName(transaction.category?.categoryName)} style={{
                      fontSize: 33, // Adjust icon size as needed
                      color: '#808080', // Adjust icon color if needed
                    }}></i>
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
