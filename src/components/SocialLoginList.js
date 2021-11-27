
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { faceBookIcon, googleIcon } from '../assets/icons';

function SocialLoginItem({ text, icon, bgColor, href }) {
  return (
    <li className="flex-grow">
      <Link to={href} className={`flex text-white rounded p-2 ${bgColor}`}>
        <Icon path={icon} className="w-6 h-6" />
        <span className="flex-grow ml-1">{ text }</span>
      </Link>
    </li>
  );
}

export default function SocialLoginList({ href }) {

  const { t } = useTranslation();

  return (
    <div className="my-2">
      <div className="text-center mb-2">
          <span className="bg-color-gray rounded-full py-1 px-2 text-sm">{ t('_user.Or_login_with') }</span>
      </div>
      <ul className="flex py-2 justify-around gap-2">
        <SocialLoginItem text="Facebook" icon={faceBookIcon} href={href} bgColor="bg-blue-600" />
        <SocialLoginItem text="Google" icon={googleIcon} href={href} bgColor="bg-red-600" />
      </ul> 
    </div>
  );
}

