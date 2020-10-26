import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UserContextProvider from './contexts/UserContext';
import TransactionContextProvider from './contexts/TransactionContext';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
