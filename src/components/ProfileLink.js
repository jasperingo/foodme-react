
import Icon from '@mdi/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ProfileLink({ href, title, icon }) {

  const { t } = useTranslation();

  return (
    <Link 
      to={href} 
      title={ t(title) }
      className="flex gap-1 justify-center btn-color-primary p-2 rounded items-center"
      >
      <Icon path={icon} className="w-4 h-4" />
      <span className="sr-only md:not-sr-only">{ t(title) }</span>
    </Link>
  );
}
