
import React from 'react';
import { Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import { useAppContext } from '../../context/AppContext';
import CartIcon from '../../icons/CartIcon';
import FavoritedIcon from '../../icons/FavoritedIcon';
import LocationIcon from '../../icons/LocationIcon';
import OrderIcon from '../../icons/OrderIcon';
import TransactionIcon from '../../icons/TransactionIcon';
import UserIcon from '../../icons/UserIcon';
import Order from './Order';
import Orders from './Orders';


const MENU_ITEMS = [
  { text: '_user.Profile', Icon: UserIcon, href: '/account'},
  { text: '_order.Orders', Icon: OrderIcon, href: '/account/orders'},
  { text: '_extra.Favorites', Icon: FavoritedIcon, href: '/account'},
  { text: '_cart.Saved_carts', Icon: CartIcon, href: '/account'},
  { text: '_user.Addresses', Icon: LocationIcon, href: '/account'},
  { text: '_transaction.Transactions', Icon: TransactionIcon, href: '/account'},
];

export default function UserAccount() {

  const match = useRouteMatch();

  const location = useLocation();

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/login" />)
  }

  return (
    <section>
      <div className="container-x">
        
        <div className="lg:flex lg:gap-5">
          <div className={`${location.pathname !== '/account' && 'hidden'} lg:block`}>
            <AccountMenuTop photo="user.jpg" name="Paul Johnson" />
            <AccountMenuList items={MENU_ITEMS} />
          </div>

          <div className="lg:flex-grow">
            <Switch>
              <Route path={`${match.url}/orders`} render={()=> <Orders />} />
              <Route path={`${match.url}/order/:ID`} render={()=> <Order />} />
            </Switch>
          </div>
        </div>

      </div>
    </section>
  );
}

