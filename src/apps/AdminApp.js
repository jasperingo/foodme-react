
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { adminIcon, dashboardIcon, messageIcon, orderIcon, searchIcon, transactionIcon } from '../assets/icons';
import Header from '../components/Header';
import AccountMenu from '../pages/Admin/AccountMenu';
import Customers from '../pages/Admin/Customers';
import Dashboard from '../pages/Admin/Dashboard';
import Login from '../pages/Admin/Login';
import DeliveryFirms from '../pages/Admin/DeliveryFirms';
import Messages from '../pages/Admin/Messages';
import Orders from '../pages/Admin/Orders';
import Profile from '../pages/Admin/Profile';
import Stores from '../pages/Admin/Stores';
import Transactions from '../pages/Admin/Transactions';
import DeliveryFirm from '../pages/Admin/DeliveryFirm';
import Store from '../pages/Admin/Store';
import Customer from '../pages/Admin/Customer';
import Order from '../pages/Admin/Order';
import Search from '../pages/Admin/Search';
import SearchHistory from '../pages/Admin/SearchHistory';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { href: '/register', exclude: true },
  { title : '_extra.Dashboard', icon: dashboardIcon, href: '/dashboard' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders', hrefs: [
      '/orders/processing', 
      '/orders/delivered', 
      '/orders/in-transit', 
      '/orders/declined', 
      '/orders/cancelled',
      '/orders/returned'
    ] 
  },
  { title : '_transaction.Transactions', icon: transactionIcon, href: '/transactions' },
  { title : '_user.Account', icon: adminIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0, pages: [] },
  { title : '_search.Search', icon: searchIcon, href: '/search/history', pages: [] }

];

export default function AdminApp() {
  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        searchHref=""
        />
      <main className="pb-52">
        <Switch>
          <Route path="/delivery-firm/:ID" render={()=> <DeliveryFirm />} />
          <Route path="/delivery-firms" render={()=> <DeliveryFirms />} />
          <Route path="/store/:ID" render={()=> <Store />} />
          <Route path="/stores" render={()=> <Stores />} />
          <Route path="/customer/:ID" render={()=> <Customer />} />
          <Route path="/customers" render={()=> <Customers />} />
          <Route path="/profile" render={()=> <Profile />} />
          <Route path="/account" render={()=> <AccountMenu />} />
          <Route path="/messages" render={()=> <Messages />} />
          <Route path="/order/:ID" render={()=> <Order />} />
          <Route path="/orders" render={()=> <Orders />} />
          <Route path="/transactions" render={()=> <Transactions />} />
          <Route path="/dashboard" render={()=> <Dashboard />} />
          <Route path="/search/history" render={()=> <SearchHistory />} />
          <Route path="/search" render={()=> <Search />} />
          <Route path="/" render={()=> <Login />} />
        </Switch>
      </main>
    </>
  );
}

AdminApp.TYPE = 'admin';

