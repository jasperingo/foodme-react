
import React from 'react';
import i18n from './locales/i18n';
import './styles/App.css';
import CustomerApp from './apps/CustomerApp';

function App() {

  i18n.changeLanguage('en');

  return <CustomerApp />;
}

export default App;


