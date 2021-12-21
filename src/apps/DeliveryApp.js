
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routeIcon, orderIcon, messageIcon, deliveryIcon, searchIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import TheRoutes from '../pages/Delivery/TheRoutes';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AccountMenu from '../pages/Delivery/AccountMenu';
import TermsOfService from '../pages/TermsOfService';
import Orders from '../pages/Delivery/Orders';
import LogIn from '../pages/Delivery/LogIn';
import Register from '../pages/Delivery/Register';
import SearchHistory from '../pages/Delivery/SearchHistory';
import Search from '../pages/Delivery/Search';
import Messages from '../pages/Delivery/Messages';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import useAuth from '../middlewares/useAuth';
import useGuest from '../middlewares/useGuest';
import TheRoute from '../pages/Delivery/TheRoute';
import Order from '../pages/Order';
import Reviews from '../pages/Delivery/Reviews';
import Wallet from '../pages/Delivery/Wallet';
import Profile from '../pages/Delivery/Profile';
import Transaction from '../pages/Transaction';

const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { href: '/register', exclude: true },
  { title : '_delivery.Routes', icon: routeIcon, href: '/routes' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders', hrefs: [
      '/orders/delivered', 
      '/orders/in-transit', 
    ]
  },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 },
  { title : '_user.Account', icon: deliveryIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_search.Search', icon: searchIcon, href: '/search/history', pages: [] }
];

export default function DeliveryApp() {

  const authMiddleware = useAuth('/');

  const guestMiddleware = useGuest('/account');

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-52">
        <Switch>
          <Route path="/reviews" render={()=> authMiddleware() || <Reviews />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction />} />
          <Route path="/wallet" render={()=> authMiddleware() || <Wallet />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/search/history" render={()=> authMiddleware() || <SearchHistory />} />
          <Route path="/search" render={()=> authMiddleware() || <Search />} />
          <Route path="/terms-of-service" render={()=> authMiddleware() || <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> authMiddleware() || <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> authMiddleware() || <ContactUs />} />
          <Route path="/about-us" render={()=> authMiddleware() || <AboutUs />} /> 
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/route/:ID" render={()=> authMiddleware() || <TheRoute />} />
          <Route path="/routes" render={()=> authMiddleware() || <TheRoutes />} />
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} />
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword />} />
          <Route path="/register" render={()=>  guestMiddleware() || <Register guestMiddleware={guestMiddleware} />} />
          <Route path="/" render={()=>  guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

DeliveryApp.TYPE = 'delivery';

