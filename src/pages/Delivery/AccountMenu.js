
import React from 'react';
import { Redirect, Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import { deliveryIcon, reviewIcon, userIcon, walletIcon } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import AppSwitch from '../../AppSwitch';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import DualPaneIntro from '../../components/DualPaneIntro';
import Wallet from './Wallet';
import Reviews from './Reviews';
import Profile from './Profile';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/account/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/account/wallet'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/account/reviews'},
];

export default function UserAccount() {

  const match = useRouteMatch();

  const location = useLocation();

  const { customer } = useAppContext();

  if (customer === 10) {
    return (<Redirect to="/" />)
  }

  return (
    <section>
      <div className="container-x">
        
        <div className="lg:flex lg:gap-5">
          <div className={`${location.pathname !== '/account' && 'hidden'} lg:block`}>
            <AccountMenuTop photo="delivery.jpeg" name="Freshways Logistics" />
            
            <AccountMenuList items={MENU_ITEMS} />
            
            <AppSwitch />
          </div>

          <Switch>
            <Route path={`${match.url}/reviews`} render={()=> <Reviews />} />
            <Route path={`${match.url}/wallet`} render={()=> <Wallet />} />
            <Route path={`${match.url}/profile`} render={()=> <Profile />} />
            <Route 
              path={match.url} 
              render={()=> <DualPaneIntro icon={deliveryIcon} text="_user.Manage_your_account" />} 
              />
          </Switch>
        </div>

      </div>
    </section>
  );
}

