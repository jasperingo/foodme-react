
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import HomeIcon from '../icons/HomeIcon';
import UserIcon from '../icons/UserIcon';
import CartIcon from '../icons/CartIcon';
import BackIcon from '../icons/BackIcon';
import SearchIcon from '../icons/SearchIcon';
import CategoriesIcon from '../icons/CategoriesIcon';
import { useAppContext } from '../context/AppContext';


export const NAV_LINKS = [
  { title : 'home', icon: HomeIcon, href: '/' },
  { title : 'categories', icon: CategoriesIcon, href: '/categories' },
  { title : 'cart', icon: CartIcon, href: '/cart' },
  { title : 'account', icon: UserIcon, href: '/login' }
];

function NavItem({ title, Icon, href }) {
  return (
    <li className="flex-1 text-center">
      <NavLink 
        exact 
        to={ href } 
        className="bg-white hover:bg-gray-100 block width-full p-2 text-sm text-gray-500"
        activeClassName="text-yellow-500"
      >
        <Icon />
        <span>{ title }</span>
      </NavLink>
    </li>
  );
}

export default function Header() {

  const { t } = useTranslation();

  const { showHeader, showSearchForm } = useAppContext();
  
  const navItems = NAV_LINKS.map((item, i) => (
    <NavItem 
      key={i}
      title={t(item.title)}  
      Icon={item.icon} 
      href={item.href} 
      />
  ));
  
  return (
    <header className={"bg-white px-2 py-4 border-b"+(showHeader ? '' : ' hidden')}>
      <div className="flex">
        <h1 className={"text-2xl font-bold text-yellow-500 flex-grow "+(showSearchForm?'hidden':'')}>{ t('app_name') }</h1>
        
        <div className={"flex items-center "+(showSearchForm?'w-full':'')}>
          <Link to="/" className={"hover:bg-gray-200 "+(showSearchForm?'':'hidden')}>
            <BackIcon />
            <span className="sr-only">{ t('Previous_page') }</span>
          </Link>
          <form method="GET" className={"flex-grow "+(showSearchForm?'':'hidden')}>
            <input 
              type="search" 
              placeholder="Search Foodme" 
              className="w-full rounded py-1 px-2 border border-yellow-500" 
              />
          </form>
          <Link 
            to="/search"  
            className={"text-gray-500 hover:bg-gray-200 block p-1 "+(showSearchForm?'hidden':'')}>
            <SearchIcon />
            <span className="sr-only">Search</span>
          </Link>
        </div>

        <nav className="fixed left-0 bottom-0 w-full border-t">
          <ul className="flex">
            { navItems }
          </ul>
        </nav>
      </div>
    </header>
  );
}

