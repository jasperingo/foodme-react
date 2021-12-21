
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { deliveryIcon, reviewIcon, userIcon, walletIcon } from '../../assets/icons';
import { useAppContext } from '../../context/AppContext';
import DualPaneIntro from '../../components/DualPaneIntro';
import Wallet from './Wallet';
import Reviews from './Reviews';
import Profile from './Profile';
import AccountMenuView from '../../components/AccountMenuView';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/account/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/account/wallet'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/account/reviews'},
];

export default function UserAccount() {

  const match = useRouteMatch();

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">

        <AccountMenuView photo={`/photos/delivery-firm/${user.photo}`} name={user.name} items={MENU_ITEMS} />

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
    </section>
  );
}

