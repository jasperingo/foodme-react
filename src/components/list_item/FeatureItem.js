
import Icon from '@mdi/react';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function FeatureItem({ icon, text }) {

  const { t } = useTranslation();

  return (
    <li>
      <div className="shadow rounded py-4 mb-4">
        <Icon path={icon} className="w-20 h-20 text-color-primary mx-auto" />
        <div className="text-center">{ t(text) }</div>
      </div>
    </li>
  );
}
