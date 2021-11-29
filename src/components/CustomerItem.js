
import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerItem({ customer: { id, first_name, last_name, photo }, href = '/customer' }) {

  const fullName = `${first_name} ${last_name}`;

  return (
    <li>
      <Link to={`${href}/${id}`} className="flex items-center py-2 gap-2 mb-4 rounded hover:bg-color-gray-h md:px-2 md:shadow">
        <img src={`/photos/${photo}`} alt={fullName} className="w-12 h-12 border rounded-full" />
        <div className="flex-grow">{ fullName }</div>
      </Link>
    </li>
  );
}
