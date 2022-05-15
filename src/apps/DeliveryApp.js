
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeIcon, orderIcon, messageIcon, deliveryIcon, walletIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import { useAppContext } from '../hooks/contextHook';
import { useDeliveryFirmAuthFetch } from '../hooks/delivery_firm/deliveryFirmAuthFetchHook';
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
import Transaction from '../pages/Transaction';
import Orders from '../pages/Delivery/Orders';
import Order from '../pages/Order';
import DeliveryRoutes from '../pages/Delivery/DeliveryRoutes';
import DeliveryRoute from '../pages/DeliveryRoute';
import DeliveryRouteCreate from '../pages/Delivery/DeliveryRouteCreate';
import DeliveryRouteUpdate from '../pages/Delivery/DeliveryRouteUpdate';
import DeliveryDurationCreate from '../pages/Delivery/DeliveryLocationCreate';
import DeliveryDurationUpdate from '../pages/Delivery/DeliveryLocationUpdate';
import DeliveryWeightCreate from '../pages/Delivery/DeliveryWeightCreate';
import DeliveryWeightUpdate from '../pages/Delivery/DeliveryWeightUpdate';
import ForgotBusinessPassword from '../pages/ForgotBusinessPassword';
import ResetPassword from '../pages/ResetPassword';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import Home from '../pages/Delivery/Home';
import Chats from '../pages/Delivery/Chats';
import Store from '../pages/Delivery/Store';
import Customer from '../pages/Customer';
import NotFoundPage from '../pages/NotFoundPage';
import ResetPasswordSuccess from '../pages/ResetPasswordSuccess';
import { useAuthMiddleware, useGuestMiddleware } from '../hooks/authHook';
import EmailVerify from '../pages/EmailVerify';

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
        deliveryFirm,
        deliveryFirmToken
      }
    } 
  } = useAppContext();

  const authMiddleware = useAuthMiddleware(deliveryFirm);

  const guestMiddleware = useGuestMiddleware(deliveryFirm, '/delivery-routes');

  const [deliveryFirmId, fetchDeliveryFirm, error] = useDeliveryFirmAuthFetch();

  useEffect(
    function() {
      if (deliveryFirm === null && deliveryFirmId !== null && error === null)
        fetchDeliveryFirm();
    },
    [deliveryFirm, deliveryFirmId, error, fetchDeliveryFirm]
  );

  if (deliveryFirm === null && deliveryFirmId !== null) {
    return <Splash onRetry={fetchDeliveryFirm} error={error} />;
  }

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-64 md:pb-52">
        <Switch>
          
          <Route path="/terms-of-service" render={()=> authMiddleware() || <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> authMiddleware() || <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> authMiddleware() || <ContactUs />} />
          <Route path="/about-us" render={()=> authMiddleware() || <AboutUs />} />

          <Route path="/reset-password-success" render={()=> guestMiddleware() || <ResetPasswordSuccess />} /> 
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} /> 
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotBusinessPassword deliveryFirm={true} />} />
          <Route path="/email-verification" render={()=> <EmailVerify />} />

          <Route path="/messages" render={()=> authMiddleware() || <Chats />} />
          <Route path="/store/:ID" render={()=> authMiddleware() || <Store />} />
          <Route path="/customer/:ID" render={()=> authMiddleware() || <Customer userToken={deliveryFirmToken} />} />
          <Route path="/delivery-route-weight/:ID/update" render={()=> authMiddleware() || <DeliveryWeightUpdate />} />
          <Route path="/delivery-route-weight/create" render={()=> authMiddleware() || <DeliveryWeightCreate />} />
          <Route path="/delivery-route-location/:ID/update" render={()=> authMiddleware() || <DeliveryDurationUpdate />} />
          <Route path="/delivery-route-location/create" render={()=> authMiddleware() || <DeliveryDurationCreate />} />
          <Route path="/delivery-route/:ID/update" render={()=> authMiddleware() || <DeliveryRouteUpdate />} />
          <Route path="/delivery-route/create" render={()=> authMiddleware() || <DeliveryRouteCreate />} />
          <Route path="/delivery-route/:ID" render={()=> authMiddleware() || <DeliveryRoute userToken={deliveryFirmToken} isDelieryFirm={true} />} />
          <Route path="/delivery-routes" render={()=> authMiddleware() || <DeliveryRoutes />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order userToken={deliveryFirmToken} isDeliveryFirm={true} />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction userToken={deliveryFirmToken} canCancel={true} />} />
          <Route path="/wallet" render={()=> authMiddleware() || <Wallet />} />
          <Route path="/settings/password" render={()=> authMiddleware() || <PasswordUpdate />} />
          <Route path="/settings/withdrawal-account" render={()=> authMiddleware() || <WithdrawalAccountUpdate />} />
          <Route path="/settings/working-hours" render={()=> authMiddleware() || <WorkingHoursUpdate />} />
          <Route path="/settings/address" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/reviews" render={()=> authMiddleware() || <Reviews />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/register" render={()=>  guestMiddleware() || <Register />} /> 
          <Route path="/login" render={()=>  guestMiddleware() || <LogIn />} /> 
          <Route path="/" exact render={()=> guestMiddleware() || <Home />} />
          <Route path="*" render={()=> <NotFoundPage />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}
