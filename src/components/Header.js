
import React from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useAppContext } from '../context/AppContext';
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

function CartCounter() {
  const { cart: {cartItems} } = useAppContext();
  return <span className="-ml-2 -mt-1 text-xs absolute bg-red-500 text-white px-1 rounded-full">
    { cartItems.length-1 < 100 ? cartItems.length-1 : '99+' }
  </span>;
}

function NavItem({ title, Icon, href, hasCounter }) {

  return (
    <li className="flex-1 text-center">
      <NavLink 
        exact 
        to={ href }
        className="block width-full py-2 px-4 text-sm text-color-gray bg-color relative hover:bg-color-gray-h"
        activeClassName="text-color-primary"
      >
        <Icon classList="fill-current mx-auto inline-block" />
        { hasCounter && <CartCounter /> }
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
        className="text-color-gray bg-color text-sm relative hover:bg-color-gray-h block p-1 lg:hidden"
        >
        <Icon classList="fill-current mx-auto inline-block" />
        { hasCounter && <CartCounter /> }
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

  function onSearchPage() {
    return (pathname==='/search/history' || pathname==='/search/stores' || pathname==='/search/products');
  }

  return (
    <header className="bg-color dark:bg-color-d py-4 border-b lg:block">
      <div className="container-x">
        <div className="flex items-center lg:gap-2">
          <h1 className={`text-2xl font-bold text-yellow-500 flex-grow lg:block lg:flex-grow-0 lg:pr-10 ${!showHeader && 'hidden'}`}>
            <Link to="/">{ t('app_name') }</Link>
          </h1>

          <div className={`flex ${!onSearchPage() && 'flex-grow'} items-center lg:flex-grow-0 ${showHeader && 'hidden'}`}>
            <button
              onClick={ ()=> { history.goBack(); } }
              className="hover:bg-color-gray-h">
              <BackIcon classList="fill-current text-color" />
              <span className="sr-only">{ t('Previous_page') }</span>
            </button>
            <h2 className={`font-bold flex-grow text-left text-xl ${onSearchPage() && 'hidden'}`}>
              { t(useHeader2Title()) }
            </h2>
          </div>
          
          <div className={`${(showHeader || !onSearchPage()) && 'hidden'} flex-grow lg:block`}>
            <SearchForm />
          </div>

          <nav>
            
            <ul className={`${onSearchPage() && 'hidden'} flex gap-2`}>
              { !showHeader && <NavTopListItem title={t('_cart.Cart')} href="/cart" Icon={CartIcon} hasCounter={true} /> }
              <NavTopListItem title={t('_search.Search')} href="/search/history" Icon={SearchIcon} />
            </ul>

            <ul className={`flex lg:flex fixed left-0 bottom-0 w-full border-t lg:static lg:w-auto lg:pl-10 lg:border-0 z-10 ${(!showHeader && 'hidden')}`}>
              {
                NAV_LINKS.map((item, i) => (
                  <NavItem 
                    key={i}
                    title={t(item.title)}  
                    Icon={item.icon} 
                    href={item.href} 
                    hasCounter={item.href==='/cart'}
                    />
                ))
              }
            </ul>

          </nav>
        </div>
      </div>
    </header>
  );
}


