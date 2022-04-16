
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTransactionStatus, useTransactionType } from '../../hooks/transaction/transactionViewHook';
import { useDateFormatter, useMoneyFormatter } from '../../hooks/viewHook';

export default function TransactionItem({ transaction: { id, amount, reference, type, created_at, status } }) {

  const { t } = useTranslation();

  const dateFomat = useDateFormatter();

  const moneyFormat = useMoneyFormatter();

  const [theStatus, statusColor] = useTransactionStatus(status);

  return (
    <li>
      <Link to={`/transaction/${id}`} className="block mb-4 py-2 rounded md:px-2 md:shadow hover:bg-color-gray-h">
        <div className="text-xl font-bold mb-1">{ moneyFormat(amount) }</div>
        <div className="flex flex-wrap items-center mb-2">
          <div className="bg-color-gray rounded-full px-2">#{ reference }</div>
          <div className="flex-grow text-right">{ t(useTransactionType(type)) }</div>
        </div>
        <div className="flex flex-wrap">
          <time dateTime={created_at} className="text-color-gray flex-grow">{ dateFomat(created_at) }</time>
          <div className={`px-2 rounded ${statusColor}`}>{ t(theStatus) }</div>
        </div>
      </Link>
    </li>
  );
}
