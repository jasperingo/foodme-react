
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import AlertDialog from './dialog/AlertDialog';
import { useDifferentTextColor, useUserStatus } from '../hooks/viewHook';

function MenuItem({ icon, text, href, index }) {

  const { t } = useTranslation();

  const iconColor = useDifferentTextColor(index);

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

function AccountMenuList({ items, onLogout }) {

  const { t } = useTranslation();

  const [dialog, setDialog] = useState(null);

  function confirmLogOut() {
    setDialog({
      body: '_user._log_out_confirm_message',
      positiveButton: {
        text: '_extra.Yes',
        action() {
          onLogout();
        }
      },
      negativeButton: {
        text: '_extra.No',
        action() {
          setDialog(null);
        }
      }
    });
  }
  
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
      <li className="col-span-3 mt-5 mb-2">
        <button className="w-full bg-color-gray py-2 rounded" onClick={confirmLogOut}>{ t('_user.Log_out') }</button>
      </li>
      { dialog && <AlertDialog dialog={dialog} /> }
    </ul>
  );
}

function AccountMenuTop({ photo, name, status, toActivate = [] }) {

  const { t } = useTranslation();

  status = useUserStatus(status);

  return (
    <div className="py-2">
      <img 
        alt={name} 
        width="100" 
        height="100" 
        src={photo}
        className="w-20 h-20 rounded-full mx-auto my-2 border"
        />
      <div className="text-center font-bold text-lg">{ name }</div>
      {
        status && 
        <div className="text-center text-sm bg-color-gray rounded w-min mx-auto px-2 mt-1">{ t(status) }</div>
      }

      {
        toActivate.length > 0 &&
        <div className="text-center text-sm text-color-primary font-bold mx-auto my-2">To activate your account</div>
      }

      {
        toActivate.map((item, i)=> <div key={i} className="text-center text-sm mx-auto mb-1">{ item }</div>)
      }
    </div>
  );
}

export default function AccountMenuView({ photo, name, status, items, onLogOut, toActivate = [] }) {
  return (
    <div className="max-w-lg mx-auto md:shadow md:my-6 md:py-2 md:px-4 md:rounded">
      <AccountMenuTop photo={photo} name={name} status={status} toActivate={toActivate} />
      <AccountMenuList items={items} onLogout={onLogOut} />
    </div>
  );
}

