
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Customer/Home';
import Login from '../pages/Customer/Login';
import Cart from '../pages/Customer/Cart';
import AccountMenu from '../pages/Customer/AccountMenu';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import TermsOfService from '../pages/TermsOfService';
import Categories from '../pages/Customer/Categories';
import Search from '../pages/Customer/Search';
import SearchHistory from '../pages/SearchHistory';
import Register from '../pages/Customer/Register';
import Store from '../pages/Customer/Store';
import Product from '../pages/Customer/Product';
import HomeIcon from '../icons/HomeIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import CartIcon from '../icons/CartIcon';
import UserIcon from '../icons/UserIcon';
import SearchIcon from '../icons/SearchIcon';
import MessageIcon from '../icons/MessageIcon';
import Messages from '../pages/Customer/Messages';
import Promotion from '../pages/Customer/Promotion';
import { useCartCounter } from '../context/AppHooks';
import PrivacyPolicy from '../pages/PrivacyPolicy';

const HEADER_NAV_LINKS = [
  { title : '_extra.Home', icon: HomeIcon, href: '/' },
  { title : '_extra.Categories', icon: CategoriesIcon, href: '/categories' },
  { title : '_message.Messages', icon: MessageIcon, href: '/messages', useCounter: ()=> 0 },
  { title : '_user.Account', icon: UserIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: CartIcon, href: '/cart', useCounter: useCartCounter,
    pages: [
      /*/store\/[0-9]+\/products/,
      /store\/[0-9]+\/reviews/,
      /store\/[0-9]+\/promotions/,
      /store\/[0-9]+\/product\/[0-9]+/*/
    ] 
  },
  { title : '_search.Search', icon: SearchIcon, href: '/search/history', pages: [] }
];

export default function CustomerApp() {
  
  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        searchHref="/search/store"
        />
      <main className="pb-52">
        <Switch>
          <Route path="/store/:sID/promotion/:pID" render={()=> <Promotion />} />
          <Route path="/store/:sID/product/:pID" render={()=> <Product />} />
          <Route path="/store/:ID" render={()=> <Store />} />
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          <Route path="/register" render={()=> <Register />} />
          <Route path="/login" render={()=> <Login />} />
          <Route path="/search/history" render={()=> <SearchHistory />} />
          <Route path="/search" render={()=> <Search />} />
          <Route path="/account" render={()=> <AccountMenu />} />
          <Route path="/messages" render={()=> <Messages />} />
          <Route path="/cart" render={()=> <Cart />} />
          <Route path="/categories" render={()=> <Categories />} />
          <Route path="/" render={()=> <Home />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}


CustomerApp.TYPE = 'customer';

