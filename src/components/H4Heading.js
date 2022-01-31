
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function H4Heading({ text, color, href }) {
  const { t } = useTranslation();
  return (
    <h4 className="flex items-center mb-1">
      <span className={`flex-grow font-bold text-lg ${color}`}>{ t(text) }</span>
      { 
        href && 
        <Link to={href} className="text-color-primary text-sm">{ t('_extra.View_all') }</Link> 
      }
    </h4>
  );
}
