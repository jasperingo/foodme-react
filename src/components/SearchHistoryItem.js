
import Icon from '@mdi/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { historyIcon } from '../assets/icons';

export default function SearchHistoryItem({ text, href = '/search/stores' }) {
  return (
    <li>
      <Link to={`${href}?q=${text}`} className="flex gap-1 hover:bg-color-gray-h py-4">
        <Icon path={historyIcon} className="w-6 h-6" />
        <div className="flex-grow">{ text }</div>
      </Link>
    </li>
  );
}
