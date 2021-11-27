
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCategoryColor } from '../context/AppHooks';
import Icon from '@mdi/react';

function MenuItem({ icon, text, href, index }) {

  const { t } = useTranslation();

  const iconColor = useCategoryColor(index);

  return (
    <li>
      <Link
        to={href}
        className={`p-2 block rounded hover:bg-color-gray-h ${iconColor}`}
        >
        <Icon path={icon} className="w-10 h-10 mx-auto block" />
        <div className="text-center">{ t(text) }</div>
      </Link>
    </li>
  );
}

export default function AccountMenuList({ items }) {

  const { t } = useTranslation();

  return (
    <ul className="grid grid-cols-3 gap-2 pt-5">
      { 
        items.map((item, i)=> (
          <MenuItem 
            index={i}
            text={item.text}
            icon={item.icon}
            href={item.href}
            key={`menu-item-${i}`}
            />
        ))
      }
      <li className="col-span-3 mt-5">
        <button className="w-full bg-color-gray py-2 rounded">{ t('_user.Log_out') }</button>
      </li>
    </ul>
  );
}
