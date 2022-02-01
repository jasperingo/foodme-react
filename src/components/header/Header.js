
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Icon from '@mdi/react';
import SearchForm from '../form/SearchForm';
import { backIcon } from '../../assets/icons';
import NavItem from './NavItem';
import { useAppContext } from '../../hooks/contextHook';


export default function Header({ navLinks, topNavLinks, searchable = false }) {

  const {
    header: {
      header: {
        //path,
        headerTitle,
        searchPage,
        topNavPaths
      }
    }
  } = useAppContext();

  //console.log(headerTitle);

  const history = useHistory();

  const { t } = useTranslation();

  const showHeader = headerTitle === null;

  return (
    <header className="bg-color dark:bg-color-d py-4 border-b lg:block">
      <div className="container-x">

        <div className="flex items-center flex-wrap gap-2 lg:gap-5">

          <h1 className={`text-2xl font-bold text-yellow-500 flex-grow lg:flex-grow-0 lg:block ${!showHeader && 'hidden'}`}>
            <Link to="/">{ t('app_name') }</Link>
          </h1>
          
          <div className={`flex ${!searchPage && 'flex-grow'} items-center gap-1 lg:flex-grow-0 lg:bg-color-primary-lg lg:py-1 lg:px-2 lg:rounded-3xl ${showHeader && 'hidden'}`}>
            <button
              onClick={ ()=> { history.goBack(); } }
              className="hover:bg-color-gray-h lg:hidden"
              >
              <Icon path={backIcon} className="w-7 h-7 text-color" />
              <span className="sr-only">{ t('Previous_page') }</span>
            </button>
            <h2 className={`font-bold flex-grow text-left text-xl ${searchPage && 'hidden'} lg:block`}>
              { t(headerTitle) }
            </h2>
          </div>

          <nav className={`flex items-center lg:flex-grow`}>

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
                    useCounter={item.useCounter}
                    />
                ))
              }
            </ul>
            
            <ul className={`${searchPage && 'hidden'} flex lg:flex lg:flex-grow`}>
              {
                topNavLinks
                .filter(item=> topNavPaths.includes(item.href))
                .map((item, i)=> (
                  <NavItem 
                    key={i}
                    href={item.href} 
                    icon={item.icon} 
                    useCounter={item.useCounter} 
                    title={ t(item.title) } 
                    top={true}
                    />
                ))
              }
            </ul>

          </nav>

          { 
            searchable && 
            <div className={`${(showHeader || !searchPage) && 'hidden'} flex-grow lg:block`}>
              <SearchForm /> 
            </div>
          }
        </div>
      </div>
    </header>
  );
}


