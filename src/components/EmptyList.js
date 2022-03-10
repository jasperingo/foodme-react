
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EmptyList({ icon, text }) {
  
  const { t } = useTranslation();

  return (
    <div className="bg-color-gray p-2 my-2 text-center rounded shadow py-5">
      { icon && <Icon path={icon} className="text-color-primary mx-auto w-20 h-20" /> }
      <div className="font-bold">{ (text && t(text)) || t('_empty.List_is_empty') }</div>
    </div>
  );
}


