
import Icon from '@mdi/react';
import React from 'react';
import { NavLink } from 'react-router-dom';


function CartCounter({ useCounter }) {
  return (
    <span className="-ml-2 -mt-1 text-xs absolute bg-red-500 text-white px-1 rounded-full">
      { useCounter() }
    </span>
  );
}

export default function NavItem({ title, icon, href, useCounter, top=false }) {

  return (
    <li className="flex-1 text-center">
      <NavLink 
        exact 
        to={ href }
        className={`block ${top ? 'py-1 px-2 lg:py-2 lg:px-4' : 'py-2 px-4'} text-sm text-color-gray bg-color hover:bg-color-gray-h lg:flex lg:items-center lg:justify-center lg:gap-1`}
        activeClassName="text-color-primary"
        >
        <div className="relative">
          <Icon path={icon} className="w-7 h-7 inline-block" />
          { useCounter && <CartCounter useCounter={useCounter} /> }
        </div>
        <span className={top ? 'sr-only lg:not-sr-only' : 'block'}>{ title }</span>
      </NavLink>
    </li>
  );
}
