
import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Splash from '../pages/Splash';
import Home from '../pages/Customer/Home';
import LogIn from '../pages/Customer/LogIn';
import Register from '../pages/Customer/Register';
import Cart from '../pages/Customer/Cart';
import AccountMenu from '../pages/Customer/AccountMenu';
import Category from '../pages/Category';
import Categories from '../pages/Categories';
import Search from '../pages/Customer/Search';
import Store from '../pages/Customer/Store';
import Product from '../pages/Customer/Product';
import Messages from '../pages/Customer/Messages';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Customer/Profile';
import Addresses from '../pages/Customer/Addresses';
import AddressAdd from '../pages/Customer/AddressAdd';
import AddressUpdate from '../pages/Customer/AddressUpdate';
import Favorites from '../pages/Customer/Favorites';
import SavedCarts from '../pages/Customer/SavedCarts';
import Order from '../pages/Order';
import Orders from '../pages/Customer/Orders';
import Transactions from '../pages/Customer/Transactions';
import Transaction from '../pages/Transaction';
import PasswordUpdate from '../pages/Customer/PasswordUpdate';
import WithdrawalAccountUpdate from '../pages/Customer/WithdrawalAccountUpdate';
import SavedCart from '../pages/SavedCart';
import DeliveryFirm from '../pages/Customer/DeliveryFirm';
import ProductReviews from '../pages/Customer/ProductReviews';
import Discount from '../pages/Discount';
import CartDeliveryMethod from '../pages/Customer/CartDeliveryMethod';
import CartDeliveryRoutes from '../pages/Customer/CartDeliveryRoutes';
import CartDiscounts from '../pages/Customer/CartDiscounts';
import CartDeliveryAddress from '../pages/Customer/CartDeliveryAddress';
import CartSummary from '../pages/Customer/CartSummary';
import CartDone from '../pages/Customer/CartDone';

import { cartIcon, categoryIcon, homeIcon, messageIcon, searchIcon, userIcon } from '../assets/icons';
import { useAppContext } from '../hooks/contextHook';
import { useCartCounter } from '../hooks/viewHook';
import { useMessageUnreceivedCounter } from '../hooks/message/messageUnreceivedCounterHook';
import { useCustomerAuthFetch } from '../hooks/customer/customerAuthFetchHook';
import NotFoundPage from '../pages/NotFoundPage';
import EmailVerify from '../pages/EmailVerify';
import ResetPasswordSuccess from '../pages/ResetPasswordSuccess';

const HEADER_NAV_LINKS = [
  { title : '_extra.Home', icon: homeIcon, href: '/' },
  { title : '_category.Categories', icon: categoryIcon, href: '/categories' },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: useMessageUnreceivedCounter },
  { title : '_user.Account', icon: userIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter },
  { title : '_search.Search', icon: searchIcon, href: '/search' }
];

export default function CustomerApp() {
  
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

  const location = useLocation();

  const redirectTo = new URLSearchParams(location.search).get('redirect_to') ?? '/account';

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

  function authMiddleware() {
    return customer !== null ? null : <Redirect to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`} />
  }

  function guestMiddleware() {
    return customer === null ? null : <Redirect to={redirectTo} />
  }
  
  return (
    <>
      <Header 
        searchable={true}
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-64 md:pb-52">
        <Switch>
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} />
          <Route path="/email-verification" render={()=> <EmailVerify />} />
          
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
          <Route path="/saved-cart/:ID" render={()=> authMiddleware() || <SavedCart userToken={customerToken} />} />
          <Route path="/saved-carts" render={()=> authMiddleware() || <SavedCarts />} />
          <Route path="/favorites" render={()=> authMiddleware() || <Favorites />} />
          <Route path="/address/add" render={()=> authMiddleware() || <AddressAdd />} />
          <Route path="/address/:ID" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/addresses" render={()=> authMiddleware() || <Addresses />} />
          <Route path="/settings/withdrawal-account" render={()=> authMiddleware() || <WithdrawalAccountUpdate />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/register" render={()=> guestMiddleware() || <Register redirectTo={redirectTo} />} /> 
          <Route path="/login" render={()=> guestMiddleware() || <LogIn redirectTo={redirectTo} />} />
          <Route path="/reset-password-success" render={()=> guestMiddleware() || <ResetPasswordSuccess />} /> 
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} /> 
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword customer={true} />} />
          <Route path="/cart" render={()=> <Cart />} />
          <Route path="/search" render={()=> <Search />} /> 
          <Route path="/discount/:ID" render={()=> <Discount userToken={customerToken} isStore={false} />} />
          <Route path="/product/:ID/reviews" render={()=> <ProductReviews />} />
          <Route path="/product/:ID" render={()=> <Product />} />
          <Route path="/delivery-firm/:ID" render={()=> <DeliveryFirm />} />
          <Route path="/store/:ID" render={()=> <Store />} />
          <Route path="/category/:ID" render={()=> <Category isAdmin={false} />} /> 
          <Route path="/categories" render={()=> <Categories />} />
          <Route path="/" exact render={()=> <Home />} />
          <Route path="*" render={()=> <NotFoundPage />} />
        </Switch>
      </main>
      <Footer registerHref="/register" loginHref="/login" />
    </>
  );
}
