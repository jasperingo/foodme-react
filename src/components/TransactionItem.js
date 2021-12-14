
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDateFormat, useMoneyFormat } from '../context/AppHooks';

export default function TransactionItem({ transaction: { amount, type, created_at, status } }) {

  const { t } = useTranslation();

  let theStatus, statusColor, theType;

  switch(status) {
    case 'processing':
      theStatus = '_order.Processing';
      statusColor = 'bg-purple-500';
      break;
    case 'failed':
      theStatus = '_extra.Failed';
      statusColor = 'bg-red-500';
      break;
    case 'approved':
      theStatus = '_extra.Approved';
      statusColor = 'bg-green-500';
      break;
    default: 
      theStatus = '_order.Pending';
      statusColor = 'bg-gray-500';
  }

  switch(type) {

    case 'refund':
      theType = '_transaction.Refund';
      break;

    default:
      theType = '_transaction.Payment';
  }

  return (
    <li>
      <div className="mb-4 py-2 rounded md:px-2 md:shadow">
        <div className="text-2xl font-bold mb-1">{ useMoneyFormat(amount) }</div>
        <div className="text-color-primary mb-1">{ t(theType) }</div>
        <div className="flex flex-wrap">
          <div className="text-color-gray flex-grow">{ useDateFormat(created_at) }</div>
          <div className={`px-2 rounded ${statusColor}`}>{ t(theStatus) }</div>
        </div>
      </div>
    </li>
  );
}
