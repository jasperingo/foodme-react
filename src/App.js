import React, { useEffect } from 'react';
import i18n from './locales/i18n';
import { Switch, Route } from "react-router-dom";
import Header from './components/header/Header';
import Splash from './pages/Splash';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AccountMenu from './pages/AccountMenu';
import Category from './pages/Category';
import Categories from './pages/Categories';
import Search from './pages/Search';
import Store from './pages/Store';
import Product from './pages/Product';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Addresses from './pages/Addresses';
import AddressAdd from './pages/AddressAdd';
import AddressUpdate from './pages/AddressUpdate';
import Favorites from './pages/Favorites';
import Order from './pages/Order';
import Orders from './pages/Orders';
import Transactions from './pages/Transactions';
import Transaction from './pages/Transaction';
import PasswordUpdate from './pages/PasswordUpdate';
import ProductReviews from './pages/ProductReviews';
import Discount from './pages/Discount';
import CartDeliveryMethod from './pages/CartDeliveryMethod';
import CartDeliveryRoutes from './pages/CartDeliveryRoutes';
import CartDiscounts from './pages/CartDiscounts';
import CartDeliveryAddress from './pages/CartDeliveryAddress';
import CartSummary from './pages/CartSummary';
import CartDone from './pages/CartDone';
import NotFoundPage from './pages/NotFoundPage';
import ResetPasswordSuccess from './pages/ResetPasswordSuccess';

import { cartIcon, categoryIcon, homeIcon, searchIcon, userIcon } from './assets/icons';
import { useAppContext } from './hooks/contextHook';
import { useCartCounter } from './hooks/viewHook';
import { useCustomerAuthFetch } from './hooks/customer/customerAuthFetchHook';
import { useAuthMiddleware, useGuestMiddleware } from './hooks/authHook';

const HEADER_NAV_LINKS = [
  { title : '_extra.Home', icon: homeIcon, href: '/' },
  { title : '_category.Categories', icon: categoryIcon, href: '/categories' },
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter },
  { title : '_user.Account', icon: userIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_search.Search', icon: searchIcon, href: '/search' }
];

export default function App() {

  i18n.changeLanguage('en');

  const { 
    customer: { 
      customer: {
        customer: {
          customer,
          customerToken
        }
      } 
    } 
  } = useAppContext();

  const authMiddleware = useAuthMiddleware(customer);

  const guestMiddleware = useGuestMiddleware(customer, '/account');

  const [customerId, fetchCustomer, error] = useCustomerAuthFetch();

  useEffect(
    function() {
      if (customer === null && customerId !== null && error === null)
        fetchCustomer();
    },
    [customer, customerId, error, fetchCustomer]
  );

  if (customer === null && customerId !== null) {
    return <Splash onRetry={fetchCustomer} error={error} />;
  }
  
  return (
    <>
      <Header 
        searchable={true}
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-24">
        <Switch>
          <Route path="/cart/done/:ID" render={()=> authMiddleware() || <CartDone />} />
          <Route path="/cart/summary" render={()=> authMiddleware() || <CartSummary />} />
          <Route path="/cart/discounts" render={()=> authMiddleware() || <CartDiscounts />} />
          <Route path="/cart/delivery-routes" render={()=> authMiddleware() || <CartDeliveryRoutes />} />
          <Route path="/cart/delivery-address" render={()=> authMiddleware() || <CartDeliveryAddress />} />
          <Route path="/cart/delivery-method" render={()=> authMiddleware() || <CartDeliveryMethod />} />
          
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction userToken={customerToken} canCancel={true} />} />
          <Route path="/transactions" render={()=> authMiddleware() || <Transactions />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order userToken={customerToken} isCustomer={true} />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/favorites" render={()=> authMiddleware() || <Favorites />} />
          <Route path="/address/add" render={()=> authMiddleware() || <AddressAdd />} />
          <Route path="/address/:ID" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/addresses" render={()=> authMiddleware() || <Addresses />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/register" render={()=> guestMiddleware() || <Register />} /> 
          <Route path="/login" render={()=> guestMiddleware() || <LogIn />} />
          <Route path="/reset-password-success" render={()=> guestMiddleware() || <ResetPasswordSuccess />} /> 
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} /> 
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword customer={true} />} />
          <Route path="/cart" render={()=> <Cart />} />
          <Route path="/search" render={()=> <Search />} /> 
          <Route path="/discount/:ID" render={()=> <Discount userToken={customerToken} isStore={false} />} />
          <Route path="/product/:ID/reviews" render={()=> <ProductReviews />} />
          <Route path="/product/:ID" render={()=> <Product />} />
          <Route path="/store/:ID" render={()=> <Store />} />
          <Route path="/category/:ID" render={()=> <Category isAdmin={false} />} /> 
          <Route path="/categories" render={()=> <Categories />} />
          <Route path="/" exact render={()=> <Home />} />
          <Route path="*" render={()=> <NotFoundPage />} />
        </Switch>
      </main>
    </>
  );
}
