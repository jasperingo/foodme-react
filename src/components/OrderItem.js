
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMoneyFormat } from '../context/AppHooks';

export default function OrderItem({ href, order: { store_name, total, status, created_at } }) {

  const { t } = useTranslation();

  let theStatus, statusColor;

  switch(status) {
    case 'declined':
      theStatus = '_order.Declined';
      statusColor = 'bg-red-500';
      break;
    case 'cancelled':
      theStatus = '_order.Cancelled';
      statusColor = 'bg-red-500';
      break;
    case 'processing':
      theStatus = '_order.Processing';
      statusColor = 'bg-purple-500';
      break;
    case 'in-transit':
      theStatus = '_order.In_transit';
      statusColor = 'bg-blue-500';
      break;
    case 'delivered':
      theStatus = '_order.Delivered';
      statusColor = 'bg-green-500';
      break;
    case 'returned':
      theStatus = '_order.Returned';
      statusColor = 'bg-gray-500';
      break;
    default: 
      theStatus = '_order.Pending';
      statusColor = 'bg-yellow-500';
  }

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

