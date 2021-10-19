
import React from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useHeader2Title, useHeaderOnMainPage } from '../context/AppHooks';
import HomeIcon from '../icons/HomeIcon';
import UserIcon from '../icons/UserIcon';
import CartIcon from '../icons/CartIcon';
import SearchIcon from '../icons/SearchIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import SearchForm from './SearchForm';
import BackIcon from '../icons/BackIcon';


export const NAV_LINKS = [
  { title : 'home', icon: HomeIcon, href: '/' },
  { title : 'categories', icon: CategoriesIcon, href: '/categories' },
  { title : 'cart', icon: CartIcon, href: '/cart' },
  { title : 'account', icon: UserIcon, href: '/account' }
];

function NavItem({ title, Icon, href, hasCounter }) {

  return (
    <li className="flex-1 text-center">
      <NavLink 
        exact 
        to={ href }
        className="block width-full p-2 text-sm text-color-gray bg-color hover:bg-color-gray-h"
        activeClassName="text-color-primary"
      >
        <Icon classList="fill-current mx-auto inline-block" />
        { /*asCounter && <sup className="-m-2 bg-red-500 text-white inline-block p-2 rounded-full">2</sup>*/ }
        <span className="block lg:sr-only">{ title }</span>
      </NavLink>
    </li>
  );
}

function NavTopListItem({ title, Icon, href, hasCounter }) {

  return (
    <li>
      <Link 
        to={href}
        className="text-color-gray bg-color hover:bg-color-gray-h block p-1 lg:hidden"
        >
        <Icon classList="fill-current mx-auto" />
        <span className="sr-only">{ title }</span>
      </Link>
    </li>
  );
}

export default function Header() {

  const history = useHistory();

  const { pathname } = useLocation();

  const { t } = useTranslation();

  const showHeader = useHeaderOnMainPage();
  
  const navItems = NAV_LINKS.map((item, i) => (
    <NavItem 
      key={i}
      title={t(item.title)}  
      Icon={item.icon} 
      href={item.href} 
      hasCounter={item.href==='/cart'}
      />
  ));

  return (
    <header className="bg-color dark:bg-color-d py-4 border-b lg:block">
      <div className="container-x">
        <div className="flex items-center lg:gap-2">
          <h1 className={`text-2xl font-bold text-yellow-500 flex-grow lg:block lg:flex-grow-0 lg:pr-10 ${!showHeader && 'hidden'}`}>
            <Link to="/">{ t('app_name') }</Link>
          </h1>

          <div className={`flex ${(pathname!=='/search/history' && pathname!=='/search/stores' && pathname!=='/search/products') && 'flex-grow'} items-center lg:flex-grow-0 ${showHeader && 'hidden'}`}>
            <button
              onClick={ ()=> { history.goBack(); } }
              className="hover:bg-color-gray-h">
              <BackIcon classList="fill-current text-color" />
              <span className="sr-only">{ t('Previous_page') }</span>
            </button>
            <h2 className={`font-bold flex-grow text-left text-xl ${(pathname==='/search/history' || pathname==='/search/stores' || pathname==='/search/products') && 'hidden'}`}>
              { t(useHeader2Title()) }
            </h2>
          </div>
          
          <div className={`${(showHeader || (pathname!=='/search/history' && pathname!=='/search/stores' && pathname!=='/search/products')) && 'hidden'} flex-grow lg:block`}>
            <SearchForm />
          </div>

          <nav>
            
            <ul className={`${(pathname==='/search/history' || pathname==='/search/stores' || pathname==='/search/products') && 'hidden'} flex gap-2`}>
              { !showHeader && <NavTopListItem title={t('_cart.Cart')} href="/cart" Icon={CartIcon} /> }
              <NavTopListItem title={t('_search.Search')} href="/search/history" Icon={SearchIcon} />
            </ul>

            <ul className={`flex lg:flex fixed left-0 bottom-0 w-full border-t lg:static lg:w-auto lg:pl-10 lg:border-0 z-10 ${(!showHeader && 'hidden')}`}>
              { navItems }
            </ul>

          </nav>
        </div>
      </div>
    </header>
  );
}


