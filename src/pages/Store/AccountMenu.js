
import React from 'react';
import { bankAccountIcon, cartIcon, locationIcon, passwordIcon, reviewIcon, userIcon, walletIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../context/AppContext';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/wallet'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/saved-carts'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/reviews'},
  { text: '_user.Address', icon: locationIcon, href: '/settings/address'},
  { text: '_transaction.Bank_account', icon: bankAccountIcon, href: '/settings/withdrawal-account'},
  { text: '_user.Password', icon: passwordIcon, href: '/settings/password'},
];

export default function AccountMenu() {

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">
        <AccountMenuView photo={`/photos/store/${user.photo}`} name={user.name} items={MENU_ITEMS} />
      </div>
    </section>
  );
}

