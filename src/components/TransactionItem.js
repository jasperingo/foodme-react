
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AdminApp from '../apps/AdminApp';
import { useDateFormat, useMoneyFormat, useTransactionStatus, useTransactionType } from '../context/AppHooks';

export default function TransactionItem({ appType, transaction: { amount, reference_code, type, created_at, status } }) {

  const { t } = useTranslation();

  const [theStatus, statusColor] = useTransactionStatus(status);

  return (
    <li>
      <div className="mb-4 py-2 rounded md:px-2 md:shadow">
        <div className="flex flex-wrap items-center mb-1">
          <div className="text-2xl font-bold flex-grow">{ useMoneyFormat(amount) }</div>
          { appType === AdminApp.TYPE && <Link to={`/transaction/${reference_code}`} className="font-bold text-color-primary">{ t('_extra.View') }</Link> }
        </div>
        <div className="flex flex-wrap items-center mb-2">
          <div className="bg-color-gray rounded-full px-2">#{ reference_code }</div>
          <div className="flex-grow text-right">{ t(useTransactionType(type)) }</div>
        </div>
        <div className="flex flex-wrap">
          <div className="text-color-gray flex-grow">{ useDateFormat(created_at) }</div>
          <div className={`px-2 rounded ${statusColor}`}>{ t(theStatus) }</div>
        </div>
      </div>
    </li>
  );
}
