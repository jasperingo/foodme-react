
import React from 'react';
import { cartIcon, reviewIcon, userIcon, walletIcon, promotionIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../context/AppContext';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/wallet'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/saved-carts'},
  { text: '_discount.Promotion', icon: promotionIcon, href: '/promotions'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/reviews'},
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

