
import React from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Icon from '@mdi/react';
import { useHeader2Title } from '../context/AppHooks';
import SearchForm from './SearchForm';
import { backIcon } from '../assets/icons';

function CartCounter({ useCounter }) {
  return (
    <span className="-ml-2 -mt-1 text-xs absolute bg-red-500 text-white px-1 rounded-full lg:-ml-10 lg:-mt-5">
      { useCounter() }
    </span>
  );
}

function NavItem({ title, icon, href, useCounter }) {

  return (
    <li className="flex-1 text-center">
      <NavLink 
        exact 
        to={ href }
        className="block py-2 px-4 text-sm text-color-gray bg-color relative lg:flex lg:items-center lg:justify-center hover:bg-color-gray-h"
        activeClassName="text-color-primary"
        >
        <Icon path={icon} className="w-7 h-7 inline-block" />
        { useCounter && <CartCounter useCounter={useCounter} /> }
        <span className="block">{ title }</span>
      </NavLink>
    </li>
  );
}

function NavTopListItem({ title, icon, href, useCounter }) {

  return (
    <li className="flex-1 text-center">
      <Link 
        to={href}
        className="text-color-gray bg-color text-sm relative hover:bg-color-gray-h block p-2 lg:px-4 lg:flex lg:items-center lg:justify-center"
        >
        <Icon path={icon} className="w-7 h-7 inline-block" />
        { useCounter && <CartCounter useCounter={useCounter} /> }
        <span className="sr-only lg:not-sr-only">{ title }</span>
      </Link>
    </li>
  );
}

export default function Header({ navLinks, topNavLinks, searchable = false }) {

  const history = useHistory();

  const { pathname } = useLocation();

  const { t } = useTranslation();

  const showHeader = navLinks.find(item=> item.href === pathname || (item.hrefs && item.hrefs.includes(pathname)));

  function onSearchPage() {
    return ['/search', '/search/stores', '/search/products', '/search/orders'].includes(pathname);
  }

  return (
    <header className="bg-color dark:bg-color-d py-4 border-b lg:block">
      <div className="container-x">
        <div className="flex items-center flex-wrap gap-2 lg:gap-5">
          <h1 className={`text-2xl font-bold text-yellow-500 flex-grow lg:flex-grow-0 lg:block ${!showHeader && 'hidden'}`}>
            <Link to="/">{ t('app_name') }</Link>
          </h1>
          
          <div className={`flex ${!onSearchPage() && 'flex-grow'} items-center gap-1 lg:flex-grow-0 lg:bg-color-primary-lg lg:py-1 lg:px-2 lg:rounded-3xl ${showHeader && 'hidden'}`}>
            <button
              onClick={ ()=> { history.goBack(); } }
              className="hover:bg-color-gray-h lg:hidden"
              >
              <Icon path={backIcon} className="w-7 h-7 text-color" />
              <span className="sr-only">{ t('Previous_page') }</span>
            </button>
            <h2 className={`font-bold flex-grow text-left text-xl ${onSearchPage() && 'hidden'} lg:block`}>
              { t(useHeader2Title()) }
            </h2>
          </div>
          
          { searchable && 
            <div className={`${(showHeader || !onSearchPage()) && 'hidden'} flex-grow lg:block`}>
              <SearchForm /> 
            </div>
          }

          <nav className={`flex items-center ${searchable === true ? 'lg:w-full': 'lg:flex-grow'}`}>

            <ul className={`flex fixed left-0 bottom-0 w-full border-t lg:static lg:w-auto lg:border-0 lg:flex lg:flex-grow z-10 ${(!showHeader && 'hidden')}`}>
              {
                navLinks
                .filter(item=> !item.exclude)
                .map((item, i) => (
                  <NavItem 
                    key={i}
                    title={t(item.title)}  
                    icon={item.icon} 
                    href={item.href} 
                    searchable={searchable}
                    useCounter={item.useCounter}
                    />
                ))
              }
            </ul>
            
            <ul className={`${onSearchPage() && 'hidden'} flex lg:flex lg:flex-grow`}>
              {
                topNavLinks.map((item, i)=> (
                  <NavTopListItem 
                    key={i}
                    href={item.href} 
                    icon={item.icon} 
                    searchable={searchable}
                    useCounter={item.useCounter} 
                    title={ t(item.title) } 
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


