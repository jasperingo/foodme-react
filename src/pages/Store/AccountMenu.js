
import React from 'react';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import AppSwitch from '../../AppSwitch';
import { cartIcon, reviewIcon, storeIcon, userIcon, walletIcon, promotionIcon } from '../../assets/icons';
import AccountMenuList from '../../components/AccountMenuList';
import AccountMenuTop from '../../components/AccountMenuTop';
import DualPaneIntro from '../../components/DualPaneIntro';
import Profile from './Profile';
import Reviews from './Reviews';
import SavedCarts from './SavedCarts';
import Wallet from './Wallet';
import Promotion from './Promotion';
import Promotions from './Promotions';
import PromotionAdd from './PromotionAdd';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/account/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/account/wallet'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/account/saved-carts'},
  { text: '_discount.Promotion', icon: promotionIcon, href: '/account/promotions'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/account/reviews'},
  
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
            <Route path={`${match.url}/reviews`} render={()=> <Reviews />} />
            <Route path={`${match.url}/promotion/add`} render={()=> <PromotionAdd />} />
            <Route path={`${match.url}/promotion/:ID`} render={()=> <Promotion />} />
            <Route path={`${match.url}/promotions`} render={()=> <Promotions />} />
            <Route path={`${match.url}/saved-carts`} render={()=> <SavedCarts />} />
            <Route path={`${match.url}/wallet`} render={()=> <Wallet />} />
            <Route path={`${match.url}/profile`} render={()=> <Profile />} />
            <Route 
              path={match.url} 
              render={()=> <DualPaneIntro icon={storeIcon} text="_user.Manage_your_account" />} 
              />
          </Switch>
        </div>
      </div>
    </section>
  );
}

