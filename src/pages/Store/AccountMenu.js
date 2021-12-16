
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
import PromotionUpdate from './PromotionUpdate';
import { useAppContext } from '../../context/AppContext';

const MENU_ITEMS = [
  { text: '_user.Profile', icon: userIcon, href: '/account/profile'},
  { text: '_transaction.Wallet', icon: walletIcon, href: '/account/wallet'},
  { text: '_cart.Saved_carts', icon: cartIcon, href: '/account/saved-carts'},
  { text: '_discount.Promotion', icon: promotionIcon, href: '/account/promotions'},
  { text: '_review.Reviews', icon: reviewIcon, href: '/account/reviews'},
  
];

export default function AccountMenu({ authMiddleware }) {

  const match = useRouteMatch();

  const location = useLocation();

  const { user: { user } } = useAppContext();

  return (
    <section>
      <div className="container-x">
        
        <div className="lg:flex lg:gap-5">
          <div className={`${location.pathname !== '/account' && 'hidden'} lg:block`}>
            <AccountMenuTop photo={user.photo} name={user.name} />
            <AccountMenuList items={MENU_ITEMS} />

            <AppSwitch />
          </div>

          <Switch>
            <Route path={`${match.url}/reviews`} render={()=> authMiddleware() || <Reviews />} />
            <Route path={`${match.url}/promotion/:ID/update`} render={()=> authMiddleware() || <PromotionUpdate />} />
            <Route path={`${match.url}/promotion/add`} render={()=> authMiddleware() || <PromotionAdd />} />
            <Route path={`${match.url}/promotion/:ID`} render={()=> authMiddleware() || <Promotion />} />
            <Route path={`${match.url}/promotions`} render={()=> authMiddleware() || <Promotions />} />
            <Route path={`${match.url}/saved-carts`} render={()=> authMiddleware() || <SavedCarts />} />
            <Route path={`${match.url}/wallet`} render={()=> authMiddleware() || <Wallet />} />
            <Route path={`${match.url}/profile`} render={()=> authMiddleware() || <Profile />} />
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

