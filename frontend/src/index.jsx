import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VariableContextProvider } from './context/VariableContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VariableContextProvider>
    <App />
    </VariableContextProvider>
  </React.StrictMode>
);


