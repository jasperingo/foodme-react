
import React from 'react';
import { Link } from 'react-router-dom';
import HistoryIcon from '../icons/HistoryIcon';

function HistoryItem({ text }) {
  return (
    <li>
      <Link to="/search" className="flex hover:bg-gray-100 p-2">
        <HistoryIcon />
        <div className="flex-grow ml-1">{ text }</div>
      </Link>
    </li>
  );
}

export default function SearchHistory() {
  return (
    <section>
      <ul className="p-2">
        <HistoryItem text="Chicken pizza" />
        <HistoryItem text="Egusi soup" />
        <HistoryItem text="chika booker" />
        <HistoryItem text="Palace Fast food" />
      </ul>
    </section>
  );
}

