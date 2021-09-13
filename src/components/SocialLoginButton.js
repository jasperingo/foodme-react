
import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialLoginButton({ text, Icon, bgColor, href }) {
  return (
    <Link to={href} className={"flex flex-grow text-white rounded p-2 "+bgColor}>
      <Icon />
      <span className="flex-grow ml-1">{ text }</span>
    </Link>
  );
}

