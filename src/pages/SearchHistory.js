
import React from 'react';
import { Link } from 'react-router-dom';
import SubHeader from '../components/SubHeader';
import HistoryIcon from '../icons/HistoryIcon';

function HistoryItem({ text }) {
  return (
    <li>
      <Link to="/search" className="flex hover:bg-gray-100 px-2 py-4">
        <HistoryIcon />
        <div className="flex-grow ml-1">{ text }</div>
      </Link>
    </li>
  );
}

export default function SearchHistory() {

  return (
    <section>

      <SubHeader search={true} />

      <div className="container mx-auto">
        <ul className="p-2">
          <HistoryItem text="Chicken pizza" />
          <HistoryItem text="Egusi soup" />
          <HistoryItem text="chika booker" />
          <HistoryItem text="Palace Fast food" />
        </ul>
      </div>

    </section>
  );
}

