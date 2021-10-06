
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EmptyList({ Icon, text }) {
  
  const { t } = useTranslation();

  return (
    <div className="bg-gray-200 p-1 my-5 text-center rounded shadow py-5">
      { Icon && <Icon classList="text-yellow-500 fill-current mx-auto w-20 h-20" /> }
      <div className="font-bold">{ (text && t(text)) || t('_empty.List_is_empty') }</div>
    </div>
  );
}

