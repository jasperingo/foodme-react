
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import HomeIcon from '../icons/HomeIcon';
import UserIcon from '../icons/UserIcon';
import CartIcon from '../icons/CartIcon';
import SearchIcon from '../icons/SearchIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import SearchForm from './SearchForm';
import { useHeaderVisible } from '../context/AppHooks';


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
        { hasCounter && <sup className="-m-2 bg-red-500 text-white inline-block p-2 rounded-full">2</sup> }
        <span className="block lg:sr-only">{ title }</span>
      </NavLink>
    </li>
  );
}

export default function Header() {

  const { t } = useTranslation();

  const showHeader = useHeaderVisible();
  
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
          <h1 className={"text-2xl font-bold text-yellow-500 flex-grow lg:flex-grow-0 lg:pr-10 "}>
            <Link to="/">{ t('app_name') }</Link>
          </h1>
          
          <div className="hidden lg:block lg:flex-grow">
            <SearchForm />
          </div>

          <nav>
            
            <ul>
              <li>
                <Link 
                  to="/search/history"
                  className="text-color-gray bg-color hover:bg-color-gray-h block p-1 lg:hidden"
                  >
                  <SearchIcon classList="fill-current mx-auto" />
                  <span className="sr-only">Search</span>
                </Link>
              </li>
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


