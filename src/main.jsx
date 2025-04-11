/**
 * Application Entry Point
 * 
 * This file serves as the entry point for the React application.
 * It renders the root App component into the DOM and sets up
 * React's StrictMode for development quality checks.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create a React root and render the App into the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode enables additional development checks and warnings
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
