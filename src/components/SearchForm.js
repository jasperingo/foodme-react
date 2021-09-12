
import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../icons/SearchIcon';

export default function SearchForm() {
  return (
    <div className="">
      <form method="GET" className="hidden">
        <input type="search" placeholder="Search Foodme" className="rounded-xl p-2 border border-yellow-500" />
      </form>
      <Link to="/" className="text-gray-500 hover:bg-gray-200 block p-1">
        <SearchIcon />
        <span className="sr-only">Search</span>
      </Link>
    </div>
  );
}

