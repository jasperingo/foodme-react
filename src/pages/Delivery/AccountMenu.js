
import React from 'react';
import { bankAccountIcon, locationIcon, passwordIcon, reviewIcon, userIcon } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import AccountMenuView from '../../components/AccountMenuView';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
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
        <AccountMenuView photo={`/photos/delivery-firm/${user.photo}`} name={user.name} items={MENU_ITEMS} />
      </div>
    </section>
  );
}

