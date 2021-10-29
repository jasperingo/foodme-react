
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
  { title : '_product.Products', icon: ProductIcon, href: URL+'/products' },
  { title : '_order.Orders', icon: OrderIcon, href: URL+'/orders' },
  { title : '_discount.Promotions', icon: DiscountIcon, href: URL+'/promotions' },
  { title : '_user.Account', icon: StoreIcon, href: URL+'/account' }
];

export const HEADER_TOP_NAV_LINKS = [
  { title : '_cart.Cart', icon: CartIcon, href: URL+'/cart', useCounter: ()=> 0, pages: [] },
  { title : '_message.Messages', icon: MessageIcon, href: URL+'/messages/chats', useCounter: ()=> 0, pages: [] },
  { title : '_search.Search', icon: SearchIcon, href: URL+'/search/history', pages: [] }
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
          <Route path={URL+'/search/history'} render={()=> <SearchHistory />} />
          <Route path={URL+'/messages'} render={()=> <Messages />} />
          <Route path={URL+'/cart'} render={()=> <Cart />} />
          <Route path={URL+'/account'} render={()=> <AccountMenu />} />
          <Route path={URL+'/promotions'} render={()=> <Promotions />} />
          <Route path={URL+'/orders'} render={()=> <Orders />} />
          <Route path={URL+'/products'} render={()=> <Products />} />
          <Route path={URL} render={()=> <LogIn />} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

