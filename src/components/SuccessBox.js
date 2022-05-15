import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { checkIcon } from '../assets/icons';

export default function SuccessBox({ href, linkText, message }) {
  
  const { t } = useTranslation();

  return (
    <div className="my-4 p-4 max-w-lg mx-auto md:shadow md:rounded">

      <Icon 
        path={checkIcon} 
        className="h-28 w-28 mx-auto text-color-primary border border-yellow-500 rounded-full p-2 mb-4" 
        />
      
      <div className="text-center font-bold mb-8">
        <div className="mb-4">{ t(message) }</div>
        <a href={href} className="inline-block btn-color-primary p-2 rounded">{ t(linkText) }</a>
      </div>

    </div>
  );
}
