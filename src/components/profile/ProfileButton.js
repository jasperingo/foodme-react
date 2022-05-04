
import Icon from '@mdi/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProfileButton({ text, icon, color, action }) {
  const { t } = useTranslation()
  return (
    <li>
      <button className={`${color} flex gap-1 justify-center p-2 rounded items-center`} onClick={action}>
        { icon && <Icon path={icon} className="w-4 h-4" /> }
        <span className={icon ? 'sr-only md:not-sr-only' : ''}>{ t(text) }</span>
      </button>
    </li>
  );
}
