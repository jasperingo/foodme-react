
import React from 'react';
import { useTranslation } from 'react-i18next';
import UserMiniLink from './UserMiniLink';

function UserDLItem({ href, photo, name, title }) {

  const { t } = useTranslation();
  
  return (
    <div className="mb-2">
      <dt className="font-bold text-sm mb-1">{ t(title) }</dt>
      <dd>
        <UserMiniLink 
          href={href}
          photo={photo}
          name={name}
          />
        </dd>
    </div>
  );
}

export default function UserDescList({ users = [] }) {
  return (
    <dl className="py-2">
      {
        users.map((item, i)=> (
          <UserDLItem
            key={`user-item-${i}`}
            href={item.href}
            photo={item.photo}
            name={item.name}
            title={item.title}
            />
        ))
      }
    </dl>
  );
}
