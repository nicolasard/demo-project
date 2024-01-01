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
  
        const amountArray: string[] = Array(totalDaysInMonth).fill('0');
        
        response.data.forEach((t) => {
          const dayIndex = dayArray.indexOf(t.day!.toString());
          if (dayIndex !== -1) {
            amountArray[dayIndex] = t.total!.toString();
          }
        });
  
        setAmount(amountArray);
        setDays(dayArray);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
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
        label: "This month",
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