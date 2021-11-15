
import React from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from '../icons/HistoryIcon';

export default function SearchHistoryItem({ text, href = '/search/stores' }) {
  return (
    <li>
      <Link to={`${href}?q=${text}`} className="flex gap-1 hover:bg-color-gray-h py-4">
        <HistoryIcon />
        <div className="flex-grow">{ text }</div>
      </Link>
    </li>
  );
}
