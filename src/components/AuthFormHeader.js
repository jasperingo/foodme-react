
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AuthFormHeader({ Icon, text }) {

  const { t } = useTranslation();

  return (
    <div className="my-4">
      <Icon classList="w-20 h-20 mx-auto text-color-primary" />
      <div className="font-bold text-center">{ t(text) }</div>
    </div>
  );
}
