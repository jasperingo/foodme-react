
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserMiniLink({ href, photo, name }) {
  return (
    <Link to={href} className="flex gap-2 items-center border p-2 rounded hover:bg-color-gray-h">
      { photo && <img src={photo} alt={name} className="w-10 h-10 rounded-full border" /> }
      <div>{ name }</div>
    </Link>
  );
}
