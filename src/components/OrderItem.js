
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMoneyFormat, useOrderStatus } from '../context/AppHooks';

export default function OrderItem({ href, order: { store_name, total, status, created_at } }) {

  const { t } = useTranslation();

  const [theStatus, statusColor] = useOrderStatus(status);

  return (
    <li>
      <Link to={href} className="block p-2 my-2 rounded hover:bg-color-gray-h lg:shadow">
        <div className="font-bold text-xl">{ store_name }</div>
        <div>{ useMoneyFormat(total) }</div>
        <div className="flex flex-wrap">
          <div className="text-color-gray flex-grow">{ created_at }</div>
          <div className={`px-2 rounded ${statusColor}`}>{ t(theStatus) }</div>
        </div>
      </Link>
    </li>
  );
}

