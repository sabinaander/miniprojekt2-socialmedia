// import React from 'react';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
// import store from './app/store'
import store from './features/login-auth/userstore'

// const root = ReactDOM.createRoot(document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container);
// const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
