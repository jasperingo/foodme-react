
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { refreshIcon } from '../assets/icons';

export default function RefreshButton({ onRefresh }) {

  const { t } = useTranslation();

  return (
    <button 
    onClick={onRefresh}
    className="btn-color-primary px-1 rounded inline-flex gap-1 items-center"
    >
    <Icon path={refreshIcon} className="w-4 h-4" />
    <span>{ t('_extra.Refresh') }</span>
  </button>
  );
}
