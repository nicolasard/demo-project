import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


function MonthlyStats() {


    useEffect(() => {
        loadReport();
    }, []);

    const [days, setDays] = useState<string[]>([]);

    const [amount, setAmount] = useState<string[]>([]);


    const loadReport = async () => {
        const month = new Date(Date.now()).getMonth()+1;
        const year = new Date(Date.now()).getFullYear();
        try {
          console.log('Getting transactions...');
          const cookies = new Cookies();
          console.log(cookies.get('jwt-token'));
    
          const jwtToken = cookies.get('jwt-token');
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
          axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;
    
         UserControllerApiFactory().getTransactionsReport(month,year).then( 
            (response)=>{
                var day:string[] = [];
                var amount:string[] = [];
                response.data.forEach(t=> { 
                  day.push(t.day!.toString());
                  amount.push(t.total!.toString());
                });
                setAmount(amount);
                setDays(day);
                console.log(response.data);
            }
         );
         
        } catch (error) {
          //console.log(error.response.data);
          // Handle errors or trigger an event to show errors
        }
      };

    
  return (
    <div>
        <div  style={{height:'600'}}>
        <Line
  datasetIdKey='id'
  options={{
    maintainAspectRatio: false,
  }}
  data={{
    labels: days,
    datasets: [
      {
        data: amount,
        borderColor: '#0d6efd',
        backgroundColor: '#0d6efd'
      }
    ],
  }}/>
        </div>
        
    </div>
  );
}

export default MonthlyStats;