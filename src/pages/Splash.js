
import React from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import Reload from '../components/Reload';

export default function Splash({ error, onRetry }) {

  const { t } = useTranslation();
  
  return (
    <section className="h-screen flex items-center justify-center flex-col gap-10">
      <div className="splash-title text-4xl font-bold text-yellow-500">{ t('app_name') }</div>
      { error ? <Reload action={onRetry} /> : <Loading /> }
    </section>
  );
}
