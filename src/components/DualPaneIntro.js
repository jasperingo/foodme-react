
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DualPaneIntro({ Icon, text }) {

  const { t } = useTranslation();

  return (
    <div className="flex-grow py-20 hidden lg:block">
      <Icon classList="w-32 h-32 mx-auto text-color-primary shadow rounded mb-4" />
      <div className="text-center text-4xl">{ t(text) }</div>
    </div>
  );
}
