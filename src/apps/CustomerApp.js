
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../pages/Customer/Home';
import LogIn from '../pages/Customer/LogIn';
import Cart from '../pages/Customer/Cart';
import AccountMenu from '../pages/Customer/AccountMenu';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import TermsOfService from '../pages/TermsOfService';
import Categories from '../pages/Customer/Categories';
import Search from '../pages/Customer/Search';
import SearchHistory from '../pages/SearchHistory';
import Register from '../pages/Customer/Register';
import Store from '../pages/Store';
import Product from '../pages/Customer/Product';
import Messages from '../pages/Customer/Messages';
import Promotion from '../pages/Customer/Promotion';
import { useCartCounter } from '../context/AppHooks';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import { cartIcon, categoryIcon, homeIcon, messageIcon, searchIcon, userIcon } from '../assets/icons';
import useAuth from '../middlewares/useAuth';
import useGuest from '../middlewares/useGuest';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Category from '../pages/Category';
import Transaction from '../pages/Transaction';
import Profile from '../pages/Customer/Profile';
import Addresses from '../pages/Customer/Addresses';
import AddressUpdate from '../pages/Customer/AddressUpdate';
import Favorites from '../pages/Customer/Favorites';
import SavedCarts from '../pages/Customer/SavedCarts';
import Order from '../pages/Order';
import Orders from '../pages/Customer/Orders';
import Transactions from '../pages/Customer/Transactions';
import AddressAdd from '../pages/Customer/AddressAdd';

const HEADER_NAV_LINKS = [
  { title : '_extra.Home', icon: homeIcon, href: '/' },
  { title : '_category.Categories', icon: categoryIcon, href: '/categories' },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 },
  { title : '_user.Account', icon: userIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter,
    pages: [
      /*/store\/[0-9]+\/products/,
      /store\/[0-9]+\/reviews/,
      /store\/[0-9]+\/promotions/,
      /store\/[0-9]+\/product\/[0-9]+/*/
    ] 
  },
  { title : '_search.Search', icon: searchIcon, href: '/search/history', pages: [] }
];

export default function CustomerApp() {

  const authMiddleware = useAuth('/login');

  const guestMiddleware = useGuest('/account');
  
  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-52">
        <Switch>
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction />} />
          <Route path="/transactions" render={()=> authMiddleware() || <Transactions />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/saved-carts" render={()=> authMiddleware() || <SavedCarts />} />
          <Route path="/favorites" render={()=> authMiddleware() || <Favorites />} />
          <Route path="/address/add" render={()=> authMiddleware() || <AddressAdd />} />
          <Route path="/address/:ID" render={()=> authMiddleware() || <AddressUpdate />} />
          <Route path="/addresses" render={()=> authMiddleware() || <Addresses />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/store/:sID/promotion/:pID" render={()=> <Promotion />} />
          <Route path="/product/:pID" render={()=> <Product />} />
          <Route path="/store/:ID" render={()=> <Store />} />
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword />} />
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword />} />
          <Route path="/register" render={()=> guestMiddleware() || <Register guestMiddleware={guestMiddleware} />} />
          <Route path="/login" render={()=> guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} />
          <Route path="/search/history" render={()=> <SearchHistory />} />
          <Route path="/search" render={()=> <Search />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/cart" render={()=> <Cart />} />
          <Route path="/category/:ID" render={()=> <Category />} />
          <Route path="/categories" render={()=> <Categories />} />
          <Route path="/" render={()=> <Home />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}


CustomerApp.TYPE = 'customer';

