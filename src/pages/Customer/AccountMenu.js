
import React from 'react';
import { useTranslation } from 'react-i18next';
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
import Address from './Address';
import Addresses from './Addresses';
import Favourites from './Favourites';
import Order from './Order';
import Orders from './Orders';
import Profile from './Profile';
import SavedCarts from './SavedCarts';


const MENU_ITEMS = [
  { text: '_user.Profile', Icon: UserIcon, href: '/account/profile'},
  { text: '_order.Orders', Icon: OrderIcon, href: '/account/orders'},
  { text: '_extra.Favorites', Icon: FavoritedIcon, href: '/account/favourites'},
  { text: '_cart.Saved_carts', Icon: CartIcon, href: '/account/saved-carts'},
  { text: '_user.Addresses', Icon: LocationIcon, href: '/account/addresses'},
  { text: '_transaction.Transactions', Icon: TransactionIcon, href: '/account'},
];

export default function UserAccount() {

  const { t } = useTranslation();

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

          <Switch>
            <Route path={`${match.url}/orders`} render={()=> <Orders />} />
            <Route path={`${match.url}/order/:ID`} render={()=> <Order />} />
            <Route path={`${match.url}/saved-carts`} render={()=> <SavedCarts />} />
            <Route path={`${match.url}/favourites`} render={()=> <Favourites />} />
            <Route path={`${match.url}/address/:ID`} render={()=> <Address />} />
            <Route path={`${match.url}/addresses`} render={()=> <Addresses />} />
            <Route path={`${match.url}/profile`} render={()=> <Profile />} />
            <Route 
              path={match.url} 
              render={()=> {
                return (
                  <div className="flex-grow py-20 hidden lg:block">
                    <UserIcon classList="w-32 h-32 mx-auto text-color-primary" />
                    <div className="text-center text-4xl text-red-500">{ t('_user.Manage_your_account') }</div>
                  </div>
                );
              }} 
              />
          </Switch>
        </div>

      </div>
    </section>
  );
}

