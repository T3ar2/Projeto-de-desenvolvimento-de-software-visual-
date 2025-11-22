import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the /client import
import App from './App.tsx'; 

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  } else {
  console.error("Root element with ID 'root' not found in the document.");
}