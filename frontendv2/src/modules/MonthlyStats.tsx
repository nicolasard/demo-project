import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import axios from 'axios';
import { UserControllerApiFactory, Transaction } from './generated-api/api';

function MonthlyStats() {


    useEffect(() => {
        loadReport();
    }, []);

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
        {(new Date(Date.now()).getMonth())}
    </div>
  );
}

export default MonthlyStats;