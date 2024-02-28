import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {FormattedMessage} from 'react-intl';
import { useNavigate } from "react-router-dom"
import { useIntl } from 'react-intl';

function MonthlyStats() {

  const navigate = useNavigate();

  const intl = useIntl();

    useEffect(() => {
        loadReport();
    }, []);

    const [days, setDays] = useState<string[]>([]);

    const [amount, setAmount] = useState<string[]>([]);

    const [lastMonthAmount, setLastMonthAmount] = useState<string[]>([]);


    const loadReport = async () => {
      try {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
    
        console.log('Getting transactions...');
    
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt-token');
    
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;
    
        const response = await UserControllerApiFactory().getTransactionsReport(month, year);
    
        const totalDaysInMonth = new Date(year, month, 0).getDate();
        const dayArray: string[] = Array.from({ length: totalDaysInMonth }, (_, index) => (index + 1).toString());
    
        // Initialize amountArray with incremental sum
        const amountArray: string[] = Array(totalDaysInMonth).fill('0').map((_, index) => {
          const sum = response.data
            .filter((t) => dayArray.indexOf(t.day!.toString()) <= index)
            .reduce((acc, t) => acc + t.total!, 0);
          return sum.toString();
        });

        const response2 = await UserControllerApiFactory().getTransactionsReport(month-1, year);
        const lastMonthAmountArray: string[] = Array(totalDaysInMonth).fill('0').map((_, index) => {
          const sum = response2.data
            .filter((t) => dayArray.indexOf(t.day!.toString()) <= index)
            .reduce((acc, t) => acc + t.total!, 0);
          return sum.toString();
        });
    
        setAmount(amountArray);
        setLastMonthAmount(lastMonthAmountArray);
        setDays(dayArray);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        // Handle errors or trigger an event to show errors
      }
    };
    
  return (
    <div>
<div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-auto">
        <button onClick={ () => navigate('/expense/new') } type="button" className="btn btn-primary" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"></path>
</svg> <FormattedMessage id = "app.header_add_expense"/></button>
        </div>
        <div className="col-sm-2">
          <div className='row'>
        <div className="col-auto">
          <div style={{fontSize:32, fontWeight:4000 }}>{ new Date(Date.now()).toLocaleDateString(intl.locale, { month: 'long' })}</div>
        </div>
        <div className="col-auto">
          <div style={{fontSize:32, fontWeight:4000 }}>{ amount[amount.length-1] } €</div>
        </div>
        </div>
        </div>
       </div>
    </div>

        <div  style={{height:'600'}}>
        <Line
        datasetIdKey='id'
        options={{
          maintainAspectRatio: false,
          animation: false
        }}
        data={{
          labels: days,
          datasets: [
            {
              label: "This month",
              data: amount,
              borderColor: '#0d6efd',
              backgroundColor: '#0d6efd'
            },
            {
              label: "Last month",
              data: lastMonthAmount,
              borderColor: '#808080',
              backgroundColor: '#808080'
            }
          ],
        }}/>
        </div>
        
    </div>
  );
}

export default MonthlyStats;