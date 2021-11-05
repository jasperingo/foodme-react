
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import CartIcon from '../icons/CartIcon';
import DiscountIcon from '../icons/DiscountIcon';
import MessageIcon from '../icons/MessageIcon';
import OrderIcon from '../icons/OrderIcon';
import ProductIcon from '../icons/ProductIcon';
import SearchIcon from '../icons/SearchIcon';
import StoreIcon from '../icons/StoreIcon';
import AccountMenu from '../pages/Store/AccountMenu';
import Cart from '../pages/Store/Cart';
import LogIn from '../pages/Store/LogIn';
import Messages from '../pages/Store/Messages';
import Orders from '../pages/Store/Orders';
import Products from '../pages/Store/Products';
import Promotions from '../pages/Store/Promotions';
import SearchHistory from '../pages/Store/SearchHistory';


export const URL = '/sapp';

export const HEADER_NAV_LINKS = [
  { href: '/', exclude: true },
  { title : '_product.Products', icon: ProductIcon, href: '/products' },
  { title : '_order.Orders', icon: OrderIcon, href: '/orders' },
  { title : '_discount.Promotions', icon: DiscountIcon, href: '/promotions' },
  { title : '_user.Account', icon: StoreIcon, href: '/account' }
];

export const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: CartIcon, href: '/cart', useCounter: ()=> 0, pages: [] },
  { title : '_message.Messages', icon: MessageIcon, href: '/messages/chats', useCounter: ()=> 0, pages: [] },
  { title : '_search.Search', icon: SearchIcon, href: '/search/history', pages: [] }
];

export default function StoreApp() {


  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={HEADER_TOP_NAV_LINKS}
        />
      <main className="pb-52">
        <Switch>
          <Route path="/search/history" render={()=> <SearchHistory />} />
          <Route path="/messages" render={()=> <Messages />} />
          <Route path="/cart" render={()=> <Cart />} />
          <Route path="/account" render={()=> <AccountMenu />} />
          <Route path="/promotions" render={()=> <Promotions />} />
          <Route path="/orders" render={()=> <Orders />} />
          <Route path="/products" render={()=> <Products />} />
          <Route path="/" render={()=> <LogIn />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

