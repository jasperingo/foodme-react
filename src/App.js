
import React from 'react';
import i18n from './locales/i18n';
import './styles/App.css';
import CustomerApp from './apps/CustomerApp';
import StoreApp from './apps/StoreApp';

function App() {

  i18n.changeLanguage('en');

  if (parseInt(localStorage.getItem('dn-app')) === 1)
    return <StoreApp />

  return <CustomerApp />;
}

export default App;
