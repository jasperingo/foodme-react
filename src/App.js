
import React from 'react';
import i18n from './locales/i18n';
import CustomerApp from './apps/CustomerApp';
import StoreApp from './apps/StoreApp';
import DeliveryApp from './apps/DeliveryApp';
import AdminApp from './apps/AdminApp';

const dev = true; //process.env.NODE_ENV === 'development';

export default function App() {

  i18n.changeLanguage('en');

  if (dev) {

    const appType = (new URLSearchParams(window.location.search)).get('app');

    if (appType !== null) {
      localStorage.setItem('dn-app', parseInt(appType));
    }
    
    if (parseInt(localStorage.getItem('dn-app')) === 1)
      return <StoreApp />;
    
    if (parseInt(localStorage.getItem('dn-app')) === 2)
      return <DeliveryApp />;
    
    if (parseInt(localStorage.getItem('dn-app')) === 3)
      return <AdminApp />;
  
  } else {

    const [subDomain] = window.location.hostname.split('.');

    if (subDomain === 'store') 
      return <StoreApp />;

    if (subDomain === 'delivery')
      return <DeliveryApp />;
    
    if (subDomain === 'admin')
      return <AdminApp />;
  
  }

  return <CustomerApp />;
}
