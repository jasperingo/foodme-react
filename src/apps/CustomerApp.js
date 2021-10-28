
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import UserAccount from '../pages/UserAccount';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import TermsOfService from '../pages/TermsOfService';
import Categories from '../pages/Categories';
import Search from '../pages/Search';
import SearchHistory from '../pages/SearchHistory';
import Register from '../pages/Register';
import Store from '../pages/Store';
import Product from '../pages/Product';
import HomeIcon from '../icons/HomeIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import CartIcon from '../icons/CartIcon';
import UserIcon from '../icons/UserIcon';
import SearchIcon from '../icons/SearchIcon';


export const HEADER_NAV_LINKS = [
  { title : 'home', icon: HomeIcon, href: '/' },
  { title : 'categories', icon: CategoriesIcon, href: '/categories' },
  { title : 'cart', icon: CartIcon, href: '/cart' },
  { title : 'account', icon: UserIcon, href: '/account' }
];

export const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: CartIcon, href: '/cart', hasCounter: true, pages: [
      /store\/[0-9]+\/products/,
      /store\/[0-9]+\/reviews/,
      /store\/[0-9]+\/promotions/,
      /store\/[0-9]+\/product\/[0-9]+/
    ] 
  },
  { title : '_search.Search', icon: SearchIcon, href: '/search/history', hasCounter: false, pages: [] }
];

export default function CustomerApp() {
  
  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-52">
        <Switch>
          <Route path="/store/:sID/product/:pID">
            <Product />
          </Route>
          <Route path="/store/:ID">
            <Store />
          </Route>
          <Route path="/terms-of-service">    
            <TermsOfService />
          </Route>
          <Route path="/contact-us">    
            <ContactUs />
          </Route>
          <Route path="/about-us">    
            <AboutUs />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/search/history">
            <SearchHistory />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/account">
            <UserAccount />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

