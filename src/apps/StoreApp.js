
import React from 'react';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { cartIcon, discountIcon, messageIcon, orderIcon, productIcon, storeIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import { useAppContext } from '../hooks/contextHook';
import { useStoreAuthFetch } from '../hooks/store/storeAuthFetchHook';
import { useCartCounter, useURLQuery } from '../hooks/viewHook';
import { FETCH_STATUSES } from '../repositories/Fetch';
import Splash from '../pages/Splash';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import ForgotBusinessPassword from '../pages/ForgotBusinessPassword';
import ResetPassword from '../pages/ResetPassword';
import LogIn from '../pages/Store/LogIn';
import Register from '../pages/Store/Register';
import AccountMenu from '../pages/Store/AccountMenu';
import Profile from '../pages/Store/Profile';
import PasswordUpdate from '../pages/Store/PasswordUpdate';
import WithdrawalAccountUpdate from '../pages/Store/WithdrawalAccountUpdate';
import AddressUpdate from '../pages/Store/AddressUpdate';
import WorkingHoursUpdate from '../pages/Store/WorkingHoursUpdate';
import Wallet from '../pages/Store/Wallet';
import Transaction from '../pages/Transaction';
import SavedCarts from '../pages/Store/SavedCarts';
import SavedCart from '../pages/Store/SavedCart';
import Reviews from '../pages/Store/Reviews';
import Discounts from '../pages/Store/Discounts';
import Discount from '../pages/Store/Discount';
import DiscountCreate from '../pages/Store/DiscountCreate';
import DiscountUpdate from '../pages/Store/DiscountUpdate';
import Orders from '../pages/Store/Orders';
import Order from '../pages/Store/Order';
import Products from '../pages/Store/Products';
import ProductCreate from '../pages/Store/ProductCreate';
import Product from '../pages/Store/Product';
import ProductUpdate from '../pages/Store/ProductUpdate';
import ProductVariantCreate from '../pages/Store/ProductVariantCreate';
import ProductVariantUpdate from '../pages/Store/ProductVariantUpdate';
import Cart from '../pages/Store/Cart';
import DiscountProductCreate from '../pages/Store/DiscountProductCreate';
import Home from '../pages/Store/Home';
import Chats from '../pages/Store/Chats';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { title : '_product.Products', icon: productIcon, href: '/products' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders' },
  { title: '_discount.Discounts', icon: discountIcon, href: '/discounts' },
  { title : '_user.Account', icon: storeIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 }
];

export default function StoreApp() {

  const { 
    store: { 
      store: {
        store,
        storeToken
      }
    } 
  } = useAppContext();

  const location = useLocation();

  const redirectTo = useURLQuery().get('redirect_to');

  const [authDone, retry] = useStoreAuthFetch();

  if (authDone !== FETCH_STATUSES.DONE) {
    return (
      <Splash 
        onRetry={retry} 
        error={authDone === FETCH_STATUSES.ERROR}
        />
    );
  }

  function authMiddleware() {
    return store !== null ? null : <Redirect to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`} />
  }

  function guestMiddleware() {
    return store === null ? null : <Redirect to={redirectTo ?? '/products'} />
  }

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-52">
        <Switch>
          
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} />
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotBusinessPassword store={true} />} />

          <Route path="/cart" render={()=> authMiddleware() || <Cart />} />
          <Route path="/product-variant/create" render={()=> authMiddleware() || <ProductVariantCreate />} />
          <Route path="/product-variant/:ID" render={()=> authMiddleware() || <ProductVariantUpdate />} />
          <Route path="/product/:ID/update" render={()=> authMiddleware() || <ProductUpdate />} />
          <Route path="/product/create" render={()=> authMiddleware() || <ProductCreate />} />
          <Route path="/product/:ID" render={()=> authMiddleware() || <Product />} />
          <Route path="/products" render={()=> authMiddleware() || <Products />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/discount/:ID/discount-product/create" render={()=> authMiddleware() || <DiscountProductCreate />} />
          <Route path="/discount/:ID/update" render={()=> authMiddleware() || <DiscountUpdate />} />
          <Route path="/discount/create" render={()=> authMiddleware() || <DiscountCreate />} />
          <Route path="/discount/:ID" render={()=> authMiddleware() || <Discount />} />
          <Route path="/discounts" render={()=> authMiddleware() || <Discounts />} />
          <Route path="/messages" render={()=> authMiddleware() || <Chats />} />
          <Route path="/reviews" render={()=> authMiddleware() || <Reviews />} />
          <Route path="/saved-cart/:ID" render={()=> authMiddleware() || <SavedCart />} />
          <Route path="/saved-carts" render={()=> authMiddleware() || <SavedCarts />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction userToken={storeToken} canCancel={true} />} />
          <Route path="/wallet" render={()=> authMiddleware() || <Wallet />} />
          <Route path="/settings/working-hours" render={()=> authMiddleware() || <WorkingHoursUpdate />} />
          <Route path="/settings/address" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/settings/withdrawal-account" render={()=> authMiddleware() || <WithdrawalAccountUpdate />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/register" render={()=> guestMiddleware() || <Register guestMiddleware={guestMiddleware} />} /> 
          <Route path="/login" render={()=> guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} />
          <Route path="/" render={()=> guestMiddleware() || <Home />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

