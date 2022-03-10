
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { filterIcon } from '../../assets/icons';

export default function SelectFilter({ label, options, value, onFilterChange }) {
  
  const { t } = useTranslation();

  return (
    <form className="flex gap-2 items-center my-2">
      <Icon path={filterIcon} className="w-6 h-6" />
      <label htmlFor="order-filter" className="sr-only">{ t(label) }</label>
      <select 
        id="order-filter" 
        className="px-2 py-1 rounded bg-color-gray" 
        defaultValue={value}
        onChange={(e)=> onFilterChange(e.target.value)}
        >
        <option value="">{ t('_extra.All') }</option>
        {
          options.map(s=> 
            <option key={`filter-option-${s}`} value={s}>{ s }</option>
          ) 
        }
      </select>
    </form>
  );
}
