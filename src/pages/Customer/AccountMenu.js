
import React from 'react';
import { cartIcon, favoritedIcon, locationIcon, orderIcon, transactionIcon, userIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../context/AppContext';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_order.Orders', icon: orderIcon, href: '/orders'},
  { text: '_extra.Favorites', icon: favoritedIcon, href: '/favorites'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/saved-carts'},
  { text: '_user.Addresses', icon: locationIcon, href: '/addresses'},
  { text: '_transaction.Transactions', icon: transactionIcon, href: '/transactions'},
];

export default function AccountMenu() {

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">
        <AccountMenuView photo={`/photos/customer/${user.photo}`} name={`${user.first_name} ${user.last_name}`} items={MENU_ITEMS} />
      </div>
    </section>
  );
}

