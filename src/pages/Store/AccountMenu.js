
import React from 'react';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import CartIcon from '../../icons/CartIcon';
import UserIcon from '../../icons/UserIcon';
import WalletIcon from '../../icons/WalletIcon';
import WithdrawIcon from '../../icons/WithdrawIcon';

const MENU_ITEMS = [
  { text: '_user.Profile', Icon: UserIcon, href: '/account'},
  { text: '_transaction.Wallet', Icon: WalletIcon, href: '/account'},
  { text: '_transaction.Withdraw', Icon: WithdrawIcon, href: '/account'},
  { text: '_cart.Saved_carts', Icon: CartIcon, href: '/account'},
  
];

export default function AccountMenu() {
  return (
    <section>
      <div className="container-x">
        <AccountMenuTop photo="store.jpeg" name="Rails Foods" />

        <AccountMenuList items={MENU_ITEMS} />
      </div>
    </section>
  );
}

