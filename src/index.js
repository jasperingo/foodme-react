
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useAppContextValues } from './hooks/contextHook';
import AppContext from './context/AppContext';
import './assets/index.css';


function AppProvider({ children }) {

  const context = useAppContextValues();

  return (
    <AppContext.Provider value={context}>
      { children }
    </AppContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
