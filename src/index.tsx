import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import { storage } from './services/storage';

// Clear quote data on app load
storage.removeQuote();

const root = ReactDOM.createRoot(
  document.getElementById('bcQuote') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

