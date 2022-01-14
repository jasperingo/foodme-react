
import React from 'react';
import i18n from './locales/i18n';
import CustomerApp from './apps/CustomerApp';
import StoreApp from './apps/StoreApp';
import DeliveryApp from './apps/DeliveryApp';
import AdminApp from './apps/AdminApp';

function App() {

  i18n.changeLanguage('en');

  const params = new URLSearchParams(window.location.search);

  const appType = params.get('app');

  if (appType !== null) {
    localStorage.setItem('dn-app', parseInt(appType));
  }
  
  if (parseInt(localStorage.getItem('dn-app')) === 1)
    return <StoreApp />
  
  if (parseInt(localStorage.getItem('dn-app')) === 2)
    return <DeliveryApp />
  
  if (parseInt(localStorage.getItem('dn-app')) === 3)
    return <AdminApp />

  return <CustomerApp />;
}

export default App;
