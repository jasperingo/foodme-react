
import React from 'react';
import { bankAccountIcon, cartIcon, locationIcon, passwordIcon, reviewIcon, timeIcon, userIcon, walletIcon } from '../../assets/icons';
import AccountMenuView from '../../components/AccountMenuView';
import { useAppContext } from '../../hooks/contextHook';
import { useHeader } from '../../hooks/headerHook';
import { useStoreLogOut } from '../../hooks/store/storeLogOutHook';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/wallet'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/saved-carts'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/reviews'},
  { text: '_user.Address', icon: locationIcon, href: '/settings/address'},
  { text: '_user.Working_hours', icon: timeIcon, href: '/settings/working-hours'},
  { text: '_transaction.Bank_account', icon: bankAccountIcon, href: '/settings/withdrawal-account'},
  { text: '_user.Password', icon: passwordIcon, href: '/settings/password'},
];

export default function AccountMenu() {

  const { 
    store: { 
      store: {
        store
      }
    } 
  } = useAppContext();

  useHeader({ 
    title: `${store.user.name} - Account`,
    topNavPaths: ['/messages', '/cart']
  });

  const onLogOut = useStoreLogOut();

  const toActivate = [];

  if (store.user.addresses.length === 0) {
    toActivate.push('Update your business address.');
  }

  if (store.user.working_hours.length === 0) {
    toActivate.push('Update your business working hours.');
  }

  return (
    <section>
      <div className="container-x">
        <AccountMenuView 
          onLogOut={onLogOut}
          photo={store.user.photo.href} 
          name={store.user.name} 
          status={store.user.status} 
          items={MENU_ITEMS} 
          toActivate={toActivate}
          />
      </div>
    </section>
  );
}

