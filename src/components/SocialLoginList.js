
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../icons/FacebookIcon';
import GoogleIcon from '../icons/GoogleIcon';

function SocialLoginItem({ text, Icon, bgColor, href }) {
  return (
    <li className="flex-grow">
      <Link to={href} className={`flex text-white rounded p-2 ${bgColor}`}>
        <Icon classList="fill-current" />
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
        <SocialLoginItem text="Facebook" Icon={FacebookIcon} href={href} bgColor="bg-blue-600" />
        <SocialLoginItem text="Google" Icon={GoogleIcon} href={href} bgColor="bg-red-600" />
      </ul> 
    </div>
  );
}

