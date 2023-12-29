import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import English from './lang/en.json';
import Spanish from './lang/es.json';
import Deutsche from './lang/de.json';
import {IntlProvider} from 'react-intl';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const locale = navigator.language;

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="129539746772-fjto05brsno322451sr2djv2oeus4jb8.apps.googleusercontent.com">
        <IntlProvider locale ={locale} messages={Deutsche}>
      <App />
        </IntlProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
