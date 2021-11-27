
import React from 'react';
import { Switch, Route } from "react-router-dom";
import { cartIcon, messageIcon, orderIcon, productIcon, promotionIcon, searchIcon, storeIcon } from '../assets/icons';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useCartCounter } from '../context/AppHooks';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AccountMenu from '../pages/Store/AccountMenu';
import Cart from '../pages/Store/Cart';
import LogIn from '../pages/Store/LogIn';
import Messages from '../pages/Store/Messages';
import Order from '../pages/Store/Order';
import Orders from '../pages/Store/Orders';
import Product from '../pages/Store/Product';
import ProductAdd from '../pages/Store/ProductAdd';
import Products from '../pages/Store/Products';
import Promotion from '../pages/Store/Promotion';
import PromotionAdd from '../pages/Store/PromotionAdd';
import Promotions from '../pages/Store/Promotions';
import Register from '../pages/Store/Register';
import Search from '../pages/Store/Search';
import SearchHistory from '../pages/Store/SearchHistory';
import TermsOfService from '../pages/TermsOfService';


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
  { title : '_discount.Promotions', icon: promotionIcon, href: '/promotions' },
  { title : '_user.Account', icon: storeIcon, href: '/account' }
];

const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: cartIcon, href: '/cart', useCounter: useCartCounter, pages: [] },
  { title : '_message.Messages', icon: messageIcon, href: '/messages', useCounter: ()=> 0, pages: [] },
  { title : '_search.Search', icon: searchIcon, href: '/search/history', pages: [] }
];

export default function StoreApp() {

  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        searchHref="/search/products"
        />
      <main className="pb-52">
        <Switch>
          <Route path="/search/history" render={()=> <SearchHistory />} />
          <Route path="/search" render={()=> <Search />} />
          <Route path="/messages" render={()=> <Messages />} />
          <Route path="/cart" render={()=> <Cart />} />
          <Route path="/account" render={()=> <AccountMenu />} />
          <Route path="/promotion/add" render={()=> <PromotionAdd />} />
          <Route path="/promotion/:ID" render={()=> <Promotion />} />
          <Route path="/promotions" render={()=> <Promotions />} />
          <Route path="/order/:ID" render={()=> <Order />} />
          <Route path="/orders" render={()=> <Orders />} />
          <Route path="/product/add" render={()=> <ProductAdd />} />
          <Route path="/product/:ID" render={()=> <Product />} />
          <Route path="/products" render={()=> <Products />} />
          <Route path="/terms-of-service" render={()=> <TermsOfService />} /> 
          <Route path="/privacy-policy" render={()=> <PrivacyPolicy />} /> 
          <Route path="/contact-us" render={()=> <ContactUs />} />
          <Route path="/about-us" render={()=> <AboutUs />} /> 
          <Route path="/register" render={()=> <Register />} />
          <Route path="/" render={()=> <LogIn />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

StoreApp.TYPE = 'store';

