
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function H4Heading({ text, color }) {
  const { t } = useTranslation();
  return <h4 className={`font-bold mb-1 text-lg ${color}`}>{ t(text) }</h4>;
}
