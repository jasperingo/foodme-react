
import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerItem({ customer: { id, user: { name, photo } } }) {

  return (
    <li>
      <Link to={`customer/${id}`} className="flex items-center py-2 gap-2 mb-4 rounded hover:bg-color-gray-h md:px-2 md:shadow">
        <img src={photo.href} alt={name} className="w-12 h-12 border rounded-full" />
        <div className="flex-grow">{ name }</div>
      </Link>
    </li>
  );
}
