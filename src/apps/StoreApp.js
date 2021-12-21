
import React from 'react';
import { Switch, Route } from "react-router-dom";
import { cartIcon, messageIcon, orderIcon, productIcon, searchIcon, storeIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCartCounter } from '../context/AppHooks';
import useAuth from '../middlewares/useAuth';
import useGuest from '../middlewares/useGuest';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import ForgotPassword from '../pages/ForgotPassword';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ResetPassword from '../pages/ResetPassword';
import AccountMenu from '../pages/Store/AccountMenu';
import Cart from '../pages/Store/Cart';
import LogIn from '../pages/Store/LogIn';
import Messages from '../pages/Store/Messages';
import Order from '../pages/Order';
import Orders from '../pages/Store/Orders';
import Product from '../pages/Store/Product';
import ProductAdd from '../pages/Store/ProductAdd';
import Products from '../pages/Store/Products';
import ProductUpdate from '../pages/Store/ProductUpdate';
import Register from '../pages/Store/Register';
import Search from '../pages/Store/Search';
import SearchHistory from '../pages/Store/SearchHistory';
import TermsOfService from '../pages/TermsOfService';
import Reviews from '../pages/Store/Reviews';
import PromotionUpdate from '../pages/Store/PromotionUpdate';
import PromotionAdd from '../pages/Store/PromotionAdd';
import Promotion from '../pages/Store/Promotion';
import Promotions from '../pages/Store/Promotions';
import SavedCarts from '../pages/Customer/SavedCarts';
import Wallet from '../pages/Store/Wallet';
import Profile from '../pages/Store/Profile';
import Transaction from '../pages/Transaction';


const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { href: '/register', exclude: true },
  { title : '_product.Products', icon: productIcon, href: '/products' },
  { title : '_order.Orders', icon: orderIcon, href: '/orders', hrefs: [
      '/orders/processing', 
      '/orders/delivered', 
      '/orders/in-transit', 
      '/orders/declined', 
      '/orders/cancelled',
      '/orders/returned'
    ]
  },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0 },
  { title : '_user.Account', icon: storeIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter, pages: [] },
  { title : '_search.Search', icon: searchIcon, href: '/search/history', pages: [] }
];

export default function StoreApp() {

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
          <Route path="/promotion/:ID/update" render={()=> authMiddleware() || <PromotionUpdate />} />
          <Route path="/promotion/add" render={()=> authMiddleware() || <PromotionAdd />} />
          <Route path="/promotion/:ID" render={()=> authMiddleware() || <Promotion />} />
          <Route path="/promotions" render={()=> authMiddleware() || <Promotions />} />
          <Route path="/saved-carts" render={()=> authMiddleware() || <SavedCarts />} />
          <Route path="/transaction/:ID" render={()=> authMiddleware() || <Transaction />} />
          <Route path="/wallet" render={()=> authMiddleware() || <Wallet />} />
          <Route path="/profile" render={()=> authMiddleware() || <Profile />} />
          <Route path="/search/history" render={()=> authMiddleware() || <SearchHistory />} />
          <Route path="/search" render={()=> authMiddleware() || <Search />} />
          <Route path="/messages" render={()=> authMiddleware() || <Messages />} />
          <Route path="/cart" render={()=> authMiddleware() || <Cart />} />
          <Route path="/account" render={()=> authMiddleware() || <AccountMenu />} />
          <Route path="/order/:ID" render={()=> authMiddleware() || <Order />} />
          <Route path="/orders" render={()=> authMiddleware() || <Orders />} />
          <Route path="/product/:ID/update" render={()=> authMiddleware() || <ProductUpdate />} />
          <Route path="/product/add" render={()=> authMiddleware() || <ProductAdd />} />
          <Route path="/product/:ID" render={()=> authMiddleware() || <Product />} />
          <Route path="/products" render={()=> authMiddleware() || <Products />} />
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          <Route path="/reset-password" render={()=> guestMiddleware() || <ResetPassword url="forgot-password.json" />} />
          <Route path="/forgot-password" render={()=> guestMiddleware() || <ForgotPassword url="forgot-password.json" />} />
          <Route path="/register" render={()=> guestMiddleware() || <Register guestMiddleware={guestMiddleware} />} />
          <Route path="/" render={()=> guestMiddleware() || <LogIn guestMiddleware={guestMiddleware} />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

StoreApp.TYPE = 'store';
