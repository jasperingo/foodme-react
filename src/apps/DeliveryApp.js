
import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { routeIcon, orderIcon, messageIcon, deliveryIcon, walletIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import { useAppContext } from '../hooks/contextHook';
import { useURLQuery } from '../hooks/viewHook';
import { useDeliveryFirmAuthFetch } from '../hooks/delivery_firm/deliveryFirmAuthFetchHook';
import { FETCH_STATUSES } from '../repositories/Fetch';
import Splash from '../pages/Splash';
import LogIn from '../pages/Delivery/LogIn';
import Register from '../pages/Delivery/Register';
import AccountMenu from '../pages/Delivery/AccountMenu';
import Profile from '../pages/Delivery/Profile';
import Reviews from '../pages/Delivery/Reviews';
import AddressUpdate from '../pages/Delivery/AddressUpdate';
import WorkingHoursUpdate from '../pages/Delivery/WorkingHoursUpdate';
import WithdrawalAccountUpdate from '../pages/Delivery/WithdrawalAccountUpdate';
import PasswordUpdate from '../pages/Delivery/PasswordUpdate';
import Wallet from '../pages/Delivery/Wallet';
import Transaction from '../pages/Delivery/Transaction';
import Orders from '../pages/Delivery/Orders';
import Order from '../pages/Delivery/Order';
import DeliveryRoutes from '../pages/Delivery/DeliveryRoutes';
import DeliveryRoute from '../pages/Delivery/DeliveryRoute';
import DeliveryRouteCreate from '../pages/Delivery/DeliveryRouteCreate';
import DeliveryRouteUpdate from '../pages/Delivery/DeliveryRouteUpdate';
import DeliveryLinkRouteCreate from '../pages/Delivery/DeliveryLinkRouteCreate';
import DeliveryLinkRouteUpdate from '../pages/Delivery/DeliveryLinkRouteUpdate';
import DeliveryDurationCreate from '../pages/Delivery/DeliveryDurationCreate';
import DeliveryDurationUpdate from '../pages/Delivery/DeliveryDurationUpdate';
import DeliveryWeightCreate from '../pages/Delivery/DeliveryWeightCreate';
// import AboutUs from '../pages/AboutUs';
// import ContactUs from '../pages/ContactUs';
// import PrivacyPolicy from '../pages/PrivacyPolicy';
// import TermsOfService from '../pages/TermsOfService';
// import Messages from '../pages/Delivery/Messages';
// import ResetPassword from '../pages/ResetPassword';
// import ForgotPassword from '../pages/ForgotPassword';
// import AddressAdd from '../pages/AddressAdd';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { href: '/register', exclude: true },
  { title : '_delivery.Routes', icon: routeIcon, href: '/delivery-routes' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders' },
  { title: '_transaction.Wallet', icon: walletIcon, href: '/wallet' },
  { title : '_user.Account', icon: deliveryIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 }
];

export default function DeliveryApp() {

  const { 
    deliveryFirm: { 
      deliveryFirm: {
        deliveryFirm
      }
    } 
  } = useAppContext();

  const location = useLocation();

  const redirectTo = useURLQuery().get('redirect_to');

  const [authDone, retry] = useDeliveryFirmAuthFetch();

  if (authDone !== FETCH_STATUSES.DONE) {
    return (
      <Splash 
        onRetry={retry} 
        error={authDone === FETCH_STATUSES.ERROR}
        />
    );
  }

  function authMiddleware() {
    return deliveryFirm !== null ? null : <Redirect to={`/?redirect_to=${encodeURIComponent(location.pathname)}`} />
  }

  function guestMiddleware() {
    return deliveryFirm === null ? null : <Redirect to={redirectTo ?? '/delivery-routes'} />
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
          <Route path="/terms-of-service" render={()=> authMiddleware() || <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> authMiddleware() || <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> authMiddleware() || <ContactUs />} />
          <Route path="/about-us" render={()=> authMiddleware() || <AboutUs />} /> 
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} />
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword />} /> */}
          
          <Route path="/delivery-route-weight/create" render={()=> authMiddleware() || <DeliveryWeightCreate />} />
          <Route path="/delivery-route-duration/:ID/update" render={()=> authMiddleware() || <DeliveryDurationUpdate />} />
          <Route path="/delivery-route-duration/create" render={()=> authMiddleware() || <DeliveryDurationCreate />} />
          <Route path="/delivery-route/link/:ID/update" render={()=> authMiddleware() || <DeliveryLinkRouteUpdate />} />
          <Route path="/delivery-route/:ID/update" render={()=> authMiddleware() || <DeliveryRouteUpdate />} />
          <Route path="/delivery-route/link/create" render={()=> authMiddleware() || <DeliveryLinkRouteCreate />} />
          <Route path="/delivery-route/create" render={()=> authMiddleware() || <DeliveryRouteCreate />} />
          <Route path="/delivery-route/:ID" render={()=> authMiddleware() || <DeliveryRoute />} />
          <Route path="/delivery-routes" render={()=> authMiddleware() || <DeliveryRoutes />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction />} />
          <Route path="/wallet" render={()=> authMiddleware() || <Wallet />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/settings/withdrawal-account" render={()=> authMiddleware() || <WithdrawalAccountUpdate />} />
          <Route path="/settings/working-hours" render={()=> authMiddleware() || <WorkingHoursUpdate />} />
          <Route path="/settings/address" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/reviews" render={()=> authMiddleware() || <Reviews />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/register" render={()=>  guestMiddleware() || <Register guestMiddleware={guestMiddleware} />} /> 
          <Route path="/" render={()=>  guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} /> 
        </Switch>
      </main>
      <Footer />
    </>
  );
}

