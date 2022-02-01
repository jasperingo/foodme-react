
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDateFormat, useMoneyFormat } from '../../hooks/viewHook';
import Discount from '../../models/Discount';

export default function DiscountItem(
  {
    discount: { 
      id, 
      title, 
      type, 
      value, 
      start_date,
      end_date
    }
  }
) {
  
  const { t } = useTranslation();

  const amount = useMoneyFormat(value);
  
  return (
    <li>
      <Link to={`/discount/${id}`} className="block hover:bg-color-gray-h p-2 mb-4 md:shadow">
        <div className="mb-2">{ title }</div>
        <div className="font-bold text-color-primary mb-2">
          { type === Discount.TYPE_AMOUNT && amount }
          { type === Discount.TYPE_AMOUNT && ` ${t('_extra.Off')}` }
          { type === Discount.TYPE_PERCENTAGE && `${value}% ${t('_extra.Off')}` }
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between text-sm text-color-gray">
          <div>
            <span>{ t('_extra.Start') }: </span> 
            <time dateTime={start_date}>{ useDateFormat(start_date) }</time>
          </div>
          <div>
            <span>{ t('_extra.End') }: </span>
            <time dateTime={end_date}>{ useDateFormat(end_date) }</time> 
          </div>
        </div>
      </Link>
    </li>
  );
}
