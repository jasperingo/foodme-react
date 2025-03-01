
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useRouteMatch } from 'react-router-dom';

function TabItem({ title, href }) {

  const match = useRouteMatch();

  const { t } = useTranslation();

  return (
    <li>
      <NavLink 
        exact 
        to={`${match.url}${href}`}
        className="block px-2 py-1 rounded btn-color-gray whitespace-nowrap"
        activeClassName="btn-color-primary"
        >
        { t(title) }
      </NavLink>
    </li>
  );
}

export default function Tab({ items, keyPrefix }) {

  return (
    <ul className="flex my-2 gap-1 overflow-auto py-2">
      {
        items.map((item, i)=> (
          <TabItem 
            key={ `${keyPrefix}-${i}` }
            title={item.title}
            href={item.href}
            />
        ))
      }
    </ul>
  );
}

