
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FetchMoreButton({ action, text = '_extra.Load_more' }) {

  const { t } = useTranslation();

  return (
    <div className="my-2 text-center">
      <button className="btn-color-primary p-2 rounded" onClick={action}>{ t(text) }</button>
    </div>
  );
}

