
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductItem({ prod }) {
  return (
    <li>
      <Link to={`/store/${prod.id}`} className="flex mb-5 hover:bg-gray-100 md:block">
        <img src={ `/photos/${prod.photo}` } alt={prod.title} className="w-20 h-20 border md:w-full md:h-full" />
        <div className="flex-grow pl-2 lg:pt-2">
          <h4 className="font-bold mb-1">{ prod.title }</h4>
        </div>
      </Link>
    </li>
  );
}
