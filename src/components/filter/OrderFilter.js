
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { filterIcon } from '../../assets/icons';
import { useOrderStatusText } from '../../hooks/order/orderViewHook';

export default function OrderFilter({ statuses, status, onFilterChange }) {

  const { t } = useTranslation();

  const statusText = useOrderStatusText();

  return (
    <form className="flex gap-2 items-center my-2">
      <Icon path={filterIcon} className="w-6 h-6" />
      <label htmlFor="order-filter" className="sr-only">{ t('_order.Filter_order_by_status') }</label>
      <select 
        id="order-filter" 
        className="px-2 py-1 rounded bg-color-gray" 
        defaultValue={status}
        onChange={(e)=> onFilterChange(e.target.value)}
        >
        <option value="">{ t('_extra.All') }</option>
        {
          statuses.map(s=> 
            <option key={`order-status-${s}`} value={s}>{ t(statusText(s)) }</option>
          ) 
        }
      </select>
    </form>
  );
}

