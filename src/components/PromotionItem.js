
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMoneyFormat } from '../context/AppHooks';

function DeductionAmount({ amount }) {
  return <>- {useMoneyFormat(amount)}</>;
}

export default function PromotionItem({ 
  promotion: { id, store, title, number_of_products, deduction_amount, deduction_percent, start_time, stop_time }, 
  href = `/store/${store.id}/promotion/${id}` 
}) {
  
  const { t } = useTranslation();
  
  return (
    <li>
      <Link to={href} className="block hover:bg-color-gray-h p-2 mb-4 md:shadow">
        <div className="font-bold mb-2">{ title }</div>
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <div className="bg-color-primary px-2 rounded-3xl">
            { deduction_percent ? `- ${deduction_percent}%` : <DeductionAmount amount={deduction_amount} /> }
          </div>
          <div className="bg-color-gray px-2 rounded-3xl">{ t('_extra.for') }</div>
          <div className="border px-2 rounded-3xl">{ t('_product.product__Count', { count : number_of_products }) }</div>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="text-sm">
            <span>{ t('_extra.Start') }: </span> 
            <span>{ start_time }</span>
          </div>
          <div className="text-sm">
            <span>{ t('_extra.End') }: </span>
            <span>{ stop_time }</span> 
          </div>
        </div>
      </Link>
    </li>
  );
}
