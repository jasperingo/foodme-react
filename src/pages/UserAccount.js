
import React from 'react';
import { Redirect } from 'react-router-dom';
import AccountMenuList from '../components/AccountMenuList';
import AccountMenuTop from '../components/AccountMenuTop';
import { useAppContext } from '../context/AppContext';
import CartIcon from '../icons/CartIcon';
import FavoritedIcon from '../icons/FavoritedIcon';
import LocationIcon from '../icons/LocationIcon';
import OrderIcon from '../icons/OrderIcon';
import TransactionIcon from '../icons/TransactionIcon';
import UserIcon from '../icons/UserIcon';


const MENU_ITEMS = [
  { text: '_user.Profile', Icon: UserIcon, href: '/account'},
  { text: '_order.Orders', Icon: OrderIcon, href: '/account/orders'},
  { text: '_extra.Favorites', Icon: FavoritedIcon, href: '/account'},
  { text: '_cart.Saved_carts', Icon: CartIcon, href: '/account'},
  { text: '_user.Addresses', Icon: LocationIcon, href: '/account'},
  { text: '_transaction.Transactions', Icon: TransactionIcon, href: '/account'},
];

export default function UserAccount() {

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/login" />)
  }

  return (
    <section>
      <div className="container-x">
        
        <AccountMenuTop photo="user.jpg" name="Paul Johnson" />

        <AccountMenuList items={MENU_ITEMS} />

      </div>
    </section>
  );
}

