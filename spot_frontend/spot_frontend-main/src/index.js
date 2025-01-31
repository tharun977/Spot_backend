import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './interceptor/axios';

// Creating the root for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside React.StrictMode for development best practices
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measuring performance in your app and sending it to an analytics endpoint
// Pass a function (e.g., reportWebVitals(console.log)) to log results
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
