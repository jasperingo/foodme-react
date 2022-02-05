
import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { adminIcon, dashboardIcon, messageIcon, orderIcon, transactionIcon } from '../assets/icons';
import { useAppContext } from '../hooks/contextHook';
import { FETCH_STATUSES } from '../repositories/Fetch';
import { useAdminAuthFetch } from '../hooks/admin/adminAuthFetchHook';
import { useURLQuery } from '../hooks/viewHook';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Splash from '../pages/Splash';
import LogIn from '../pages/Admin/LogIn';
import Dashboard from '../pages/Admin/Dashboard';
import Orders from '../pages/Admin/Orders';
// import Transactions from '../pages/Admin/Transactions';
import Messages from '../pages/Admin/Messages';
import AccountMenu from '../pages/Admin/AccountMenu';
import Profile from '../pages/Admin/Profile';
import PasswordUpdate from '../pages/Admin/PasswordUpdate';
import Customers from '../pages/Admin/Customers';
import Customer from '../pages/Admin/Customer';
import CustomerUpdate from '../pages/Admin/CustomerUpdate';
import Stores from '../pages/Admin/Stores';
import Store from '../pages/Admin/Store';
import StoreUpdate from '../pages/Admin/StoreUpdate';
import DeliveryFirms from '../pages/Admin/DeliveryFirms';
import DeliveryFirm from '../pages/Admin/DeliveryFirm';
import DeliveryFirmUpdate from '../pages/Admin/DeliveryFirmUpdate';
import Categories from '../pages/Categories';
import Category from '../pages/Category';
import CategoryAdd from '../pages/Admin/CategoryAdd';
import CategoryUpdate from '../pages/Admin/CategoryUpdate';
import SubCategoryAdd from '../pages/Admin/SubCategoryAdd';
import SubCategoryUpdate from '../pages/Admin/SubCategoryUpdate';
import Product from '../pages/Admin/Product';
import Discount from '../pages/Admin/Discount';
import Order from '../pages/Admin/Order';
import Transaction from '../pages/Admin/Transaction';
import DeliveryRoute from '../pages/Admin/DeliveryRoute';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { href: '/register', exclude: true },
  { title : '_extra.Dashboard', icon: dashboardIcon, href: '/dashboard' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders' },
  { title : '_transaction.Transactions', icon: transactionIcon, href: '/transactions' },
  { title : '_user.Account', icon: adminIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 },
];

export default function AdminApp() {

  const { 
    admin: { 
      admin: {
        admin
      }
    } 
  } = useAppContext();

  const location = useLocation();

  const redirectTo = useURLQuery().get('redirect_to');

  const [authDone, retry] = useAdminAuthFetch();

  if (authDone !== FETCH_STATUSES.DONE) {
    return (
      <Splash 
        onRetry={retry} 
        error={authDone === FETCH_STATUSES.ERROR}
        />
    );
  }

  function authMiddleware() {
    return admin !== null ? null : <Redirect to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`} />
  }

  function guestMiddleware() {
    return admin === null ? null : <Redirect to={redirectTo ?? '/dashboard'} />
  }

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-52">
        <Switch>
          {/* 
          <Route path="/transactions" render={()=> authMiddleware() || <Transactions />} />*/}
          <Route path="/delivery-route/:ID" render={()=> authMiddleware() || <DeliveryRoute />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/discount/:ID" render={()=> authMiddleware() || <Discount />} />
          <Route path="/product/:ID" render={()=> authMiddleware() || <Product />} />
          <Route path="/delivery-firm/:ID/update" render={()=> authMiddleware() || <DeliveryFirmUpdate />} />
          <Route path="/delivery-firm/:ID" render={()=> authMiddleware() || <DeliveryFirm />} />
          <Route path="/delivery-firms" render={()=> authMiddleware() || <DeliveryFirms />} />
          <Route path="/store/:ID/update" render={()=> authMiddleware() || <StoreUpdate />} />
          <Route path="/store/:ID" render={()=> authMiddleware() || <Store />} />
          <Route path="/stores" render={()=> authMiddleware() || <Stores />} />
          <Route path="/customer/:ID/update" render={()=> authMiddleware() || <CustomerUpdate />} />
          <Route path="/customer/:ID" render={()=> authMiddleware() || <Customer />} />
          <Route path="/customers" render={()=> authMiddleware() || <Customers />} />
          <Route path="/sub-category/:ID/update" render={()=> authMiddleware() || <SubCategoryUpdate />} />
          <Route path="/sub-category/add" render={()=> authMiddleware() || <SubCategoryAdd />} />
          <Route path="/category/:ID/update" render={()=> authMiddleware() || <CategoryUpdate />} />
          <Route path="/category/add" render={()=> authMiddleware() || <CategoryAdd />} />
          <Route path="/category/:ID" render={()=> authMiddleware() || <Category isAdmin={true} />} />
          <Route path="/categories" render={()=> authMiddleware() || <Categories isAdmin={true} />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/dashboard" render={()=> authMiddleware() || <Dashboard />} /> 
          <Route path="/" render={()=> guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}


