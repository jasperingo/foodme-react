
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { filterIcon } from '../../assets/icons';

export default function OrderFilter({ statuses, status, onFilterChange }) {

  const { t } = useTranslation();

  return (
    <form className="flex gap-2 items-center my-2">
      <Icon path={filterIcon} className="w-6 h-6" />
      <label htmlFor="search-filter" className="sr-only">{ t('_order.Filter_order_by_status') }</label>
      <select 
        id="search-filter" 
        className="px-2 py-1 rounded bg-color-gray" 
        defaultValue={status}
        onChange={(e)=> onFilterChange(e.target.value)}
        >
        <option value="">{ t('_extra.All') }</option>
        {
          statuses.map(s=> 
            <option key={`sub-category-${s}`} value={s}>{ s }</option>
          ) 
        }
      </select>
    </form>
  )
}

