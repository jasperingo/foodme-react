
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { refreshIcon } from '../assets/icons';

export default function Refresh({ onRefresh }) {

  const { t } = useTranslation();

  return (
    <div className="p-1">
      <button 
        onClick={onRefresh} 
        className="flex gap-2 justify-center items-center text-color-primary border mx-auto p-2 rounded hover:bg-color-gray-h"
        >
        <span>{ t('_extra.Refresh') }</span>
        <Icon path={refreshIcon} className="w-6 h-6" />
      </button>
    </div>
  );
}
