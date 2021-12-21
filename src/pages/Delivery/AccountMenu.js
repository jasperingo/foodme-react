
import React from 'react';
import { reviewIcon, userIcon, walletIcon } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import AccountMenuView from '../../components/AccountMenuView';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/wallet'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/reviews'},
];

export default function AccountMenu() {

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">
        <AccountMenuView photo={`/photos/delivery-firm/${user.photo}`} name={user.name} items={MENU_ITEMS} />
      </div>
    </section>
  );
}

