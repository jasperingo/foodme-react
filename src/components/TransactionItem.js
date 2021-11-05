
import React from 'react';
import { useMoneyFormat } from '../context/AppHooks';

export default function TransactionItem({ transaction: { amount, type, created_at, status } }) {
  return (
    <li>
      <div className="p-2 rounded md:shadow">
        <div className="text-2xl font-bold mb-1">{ useMoneyFormat(amount) }</div>
        <div className="text-color-primary mb-1">{ type }</div>
        <div className="flex flex-wrap">
          <div className="text-color-gray flex-grow">{ created_at }</div>
          <div className={`px-2 rounded bg-green-500`}>{ status }</div>
        </div>
      </div>
    </li>
  );
}
