
import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import AppSwitch from '../../AppSwitch';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import DualPaneIntro from '../../components/DualPaneIntro';
import CartIcon from '../../icons/CartIcon';
import StoreIcon from '../../icons/StoreIcon';
import UserIcon from '../../icons/UserIcon';
import WalletIcon from '../../icons/WalletIcon';
import Profile from './Profile';
import SavedCarts from './SavedCarts';
import Wallet from './Wallet';

const MENU_ITEMS = [
  { text: '_user.Profile', Icon: UserIcon, href: '/account/profile'},
  { text: '_transaction.Wallet', Icon: WalletIcon, href: '/account/wallet'},
  { text: '_cart.Saved_carts', Icon: CartIcon, href: '/account/saved-carts'},
  
];

export default function AccountMenu() {

  const match = useRouteMatch();

  const location = useLocation();

  return (
    <section>
      <div className="container-x">
        
        <div className="lg:flex lg:gap-5">
          <div className={`${location.pathname !== '/account' && 'hidden'} lg:block`}>
            <AccountMenuTop photo="store.jpeg" name="Rails Foods" />
            <AccountMenuList items={MENU_ITEMS} />

            <AppSwitch />
          </div>

          <Switch>
            <Route path={`${match.url}/saved-carts`} render={()=> <SavedCarts />} />
            <Route path={`${match.url}/wallet`} render={()=> <Wallet />} />
            <Route path={`${match.url}/profile`} render={()=> <Profile />} />
            <Route 
              path={match.url} 
              render={()=> <DualPaneIntro Icon={StoreIcon} text="_user.Manage_your_account" />} 
              />
          </Switch>
        </div>
      </div>
    </section>
  );
}

