
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../components/Header';
import DiscountIcon from '../icons/DiscountIcon';
import OrderIcon from '../icons/OrderIcon';
import ProductIcon from '../icons/ProductIcon';
import StoreIcon from '../icons/StoreIcon';


export const URL = '/sapp';

export const HEADER_NAV_LINKS = [
  { title : '_product.Products', icon: ProductIcon, href: URL },
  { title : '_order.Orders', icon: OrderIcon, href: URL+'/orders' },
  { title : '_discount.Promotions', icon: DiscountIcon, href: URL+'/promotions' },
  { title : '_extra.Account', icon: StoreIcon, href: URL+'/account' }
];


export default function StoreApp() {


  return (
    <>
      <Header 
        navLinks={HEADER_NAV_LINKS}
        topNavLinks={[]}
        />
      <main className="pb-52">
        <Switch>
          <Route path={URL+'/account'} render={()=> <div>Store account</div>} />
          <Route path={URL+'/promotions'} render={()=> <div>Promotions</div>} />
          <Route path={URL+'/orders'} render={()=> <div>Orders</div>} />
          <Route path={URL} render={()=> <div>Products</div>} />
        </Switch>
      </main>
    </>
  );
}

