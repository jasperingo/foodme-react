
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


const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { href: '/register', exclude: true },
  { title : '_delivery.Routes', icon: routeIcon, href: '/routes' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders', hrefs: [
      '/orders/processing', 
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
  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        searchHref="/search/orders"
        />
      <main className="pb-52">
        <Switch>
          <Route path="/search/history" render={()=> <SearchHistory />} />
          <Route path="/search" render={()=> <Search />} />
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          <Route path="/account" render={()=> <AccountMenu />} />
          <Route path="/messages" render={()=> <Messages />} />
          <Route path="/orders" render={()=> <Orders />} />
          <Route path="/routes" render={()=> <TheRoutes />} />
          <Route path="/register" render={()=> <Register />} />
          <Route path="/" render={()=> <LogIn />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

DeliveryApp.TYPE = 'delivery';

