
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminApp from '../apps/AdminApp';
import CustomerApp from '../apps/CustomerApp';
import StoreApp from '../apps/StoreApp';
import { storeIcon, userIcon } from '../assets/icons';
import { useMoneyFormat, useOrderStatus } from '../context/AppHooks';

function User({ name, icon, appType }) {
  
  return(
    <div className="font-bold text-lg flex items-center gap-1">
      { appType === AdminApp.TYPE && <Icon path={icon} className="w-5 h-5" /> }
      <span>{ name }</span>
    </div> 
  );
}

export default function OrderItem({ href, appType = CustomerApp.TYPE, order: { store_name, customer_name, total, status, created_at } }) {

  const { t } = useTranslation();

  const [theStatus, statusColor] = useOrderStatus(status);

  return (
    <li>
      <Link to={href} className="block py-2 mb-2 rounded hover:bg-color-gray-h lg:px-2 lg:shadow">
        { 
          (appType === CustomerApp.TYPE || appType === AdminApp.TYPE) && <User name={store_name} icon={storeIcon} appType={appType} />
        }
        { 
          (appType === StoreApp.TYPE || appType === AdminApp.TYPE) && <User name={customer_name} icon={userIcon} appType={appType} />
        }
        <div>{ useMoneyFormat(total) }</div>
        <div className="flex flex-wrap">
          <div className="text-color-gray flex-grow">{ created_at }</div>
          <div className={`px-2 rounded ${statusColor}`}>{ t(theStatus) }</div>
        </div>
      </Link>
    </li>
  );
}

