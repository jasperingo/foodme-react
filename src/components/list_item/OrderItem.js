
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useOrderStatus } from '../../hooks/order/orderViewHook';
import { useDateFormatter, useMoneyFormatter } from '../../hooks/viewHook';

export default function OrderItem({ order: { id, number, total, status, created_at } }) {

  const { t } = useTranslation();

  const dateFomat = useDateFormatter();

  const moneyFormat = useMoneyFormatter();

  const [theStatus, statusColor] = useOrderStatus(status);

  return (
    <li>
      <Link to={`/order/${id}`} className="block py-2 mb-2 rounded hover:bg-color-gray-h lg:px-2 lg:shadow">
      <div className="font-bold text-xl flex items-center gap-1">#{ number }</div> 
        <div>{ moneyFormat(total) }</div>
        <div className="flex flex-wrap">
          <div className="text-color-gray flex-grow">{ dateFomat(created_at) }</div>
          <div className={`px-2 rounded ${statusColor}`}>{ t(theStatus) }</div>
        </div>
      </Link>
    </li>
  );
}

