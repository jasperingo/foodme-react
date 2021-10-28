
import React from 'react';
import i18n from './locales/i18n';
import { Route, Switch } from 'react-router';
import './styles/App.css';
import CustomerApp from './apps/CustomerApp';
import StoreApp from './apps/StoreApp';

function App() {

  i18n.changeLanguage('en');

  return (
    <Switch>
      <Route path="/sapp" render={StoreApp} />
      <Route path="/" render={CustomerApp} />
    </Switch>
  );
}

export default App;


