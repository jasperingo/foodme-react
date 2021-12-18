
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { adminIcon, dashboardIcon, messageIcon, orderIcon, searchIcon, transactionIcon } from '../assets/icons';
import Header from '../components/Header';
import AccountMenu from '../pages/Admin/AccountMenu';
import Customers from '../pages/Admin/Customers';
import Dashboard from '../pages/Admin/Dashboard';
import LogIn from '../pages/Admin/LogIn';
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
import useGuest from '../middlewares/useGuest';
import useAuth from '../middlewares/useAuth';
import Categories from '../pages/Admin/Categories';
import CategoryAdd from '../pages/Admin/CategoryAdd';
import CustomerAdd from '../pages/Admin/CustomerAdd';
import CustomerUpdate from '../pages/Admin/CustomerUpdate';
import CategoryUpdate from '../pages/Admin/CategoryUpdate';
import StoreUpdate from '../pages/Admin/StoreUpdate';
import StoreAdd from '../pages/Admin/StoreAdd';
import DeliveryFirmUpdate from '../pages/Admin/DeliveryFirmUpdate';
import DeliveryFirmAdd from '../pages/Admin/DeliveryFirmAdd';
import Category from '../pages/Category';
import SubCategoryUpdate from '../pages/Admin/SubCategoryUpdate';
import SubCategoryAdd from '../pages/Admin/SubCategoryAdd';

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

  const authMiddleware = useAuth('/');

  const guestMiddleware = useGuest('/account');

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        searchHref=""
        />
      <main className="pb-52">
        <Switch>
          <Route path="/sub-category/:ID/update" render={()=> authMiddleware() || <SubCategoryUpdate />} />
          <Route path="/sub-category/add" render={()=> authMiddleware() || <SubCategoryAdd />} />
          <Route path="/category/:ID/update" render={()=> authMiddleware() || <CategoryUpdate />} />
          <Route path="/category/add" render={()=> authMiddleware() || <CategoryAdd />} />
          <Route path="/category/:ID" render={()=> authMiddleware() || <Category appType={AdminApp.TYPE} />} />
          <Route path="/categories" render={()=> authMiddleware() || <Categories />} />
          <Route path="/delivery-firm/:ID/update" render={()=> authMiddleware() || <DeliveryFirmUpdate />} />
          <Route path="/delivery-firm/add" render={()=> authMiddleware() || <DeliveryFirmAdd />} />
          <Route path="/delivery-firm/:ID" render={()=> authMiddleware() || <DeliveryFirm />} />
          <Route path="/delivery-firms" render={()=> authMiddleware() || <DeliveryFirms />} />
          <Route path="/store/:ID/update" render={()=> authMiddleware() || <StoreUpdate />} />
          <Route path="/store/add" render={()=> authMiddleware() || <StoreAdd />} />
          <Route path="/store/:ID" render={()=> authMiddleware() || <Store />} />
          <Route path="/stores" render={()=> authMiddleware() || <Stores />} />
          <Route path="/customer/:ID/update" render={()=> authMiddleware() || <CustomerUpdate />} />
          <Route path="/customer/add" render={()=> authMiddleware() || <CustomerAdd />} />
          <Route path="/customer/:ID" render={()=> authMiddleware() || <Customer />} />
          <Route path="/customers" render={()=> authMiddleware() || <Customers />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/transactions" render={()=> authMiddleware() || <Transactions />} />
          <Route path="/dashboard" render={()=> authMiddleware() || <Dashboard />} />
          <Route path="/search/history" render={()=> authMiddleware() || <SearchHistory />} />
          <Route path="/search" render={()=> authMiddleware() || <Search />} />
          <Route path="/" render={()=> guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} />
        </Switch>
      </main>
    </>
  );
}

AdminApp.TYPE = 'admin';

