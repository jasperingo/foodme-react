
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProfileButton({ text, color, action }) {
  const { t } = useTranslation()
  return (
    <li>
      <button className={`${color} px-2 py-1 rounded`} onClick={action}>{ t(text) }</button>
    </li>
  );
}
