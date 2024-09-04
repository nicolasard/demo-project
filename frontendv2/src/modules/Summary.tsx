import React, { useState, useEffect } from 'react';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Pie } from 'react-chartjs-2';
import ApiClient from './common/ApiClient';


const Summary = () => {

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

  return (
    <div>
        <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-sm-2">
          <div className='row'>
        <div className="col-auto">
          <div style={{fontSize:32, fontWeight:4000 }}>{ new Date(Date.now()).toLocaleDateString(intl.locale, { month: 'long' })}</div>
        </div>
        </div>
        </div>
       </div>
    </div>
         <div>
            <Pie
            options={{
              maintainAspectRatio: false,
              animation: false
            }}
             data={{
                labels: ["Groceries","Leisure"],
                datasets: [
                  {
                    label: "This month",
                    data: [12,124],
                  }
                ],
              }}
            />
        </div>
     </div>
  );
};

export default Summary;
