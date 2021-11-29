
import React from 'react';
import { Link } from 'react-router-dom';
import ReviewStars from './ReviewStars';

export default function DeliveryFirmItem({ delivery: { id, name, photo, ratings }, href = '/delivery-firm' }) {
  return (
    <li>
      <Link to={`${href}/${id}`} className="flex gap-2 mb-4 bg-color hover:bg-color-gray-h md:block md:shadow">
        <img src={ `/photos/${photo}` } alt={name} className="w-20 h-20 border rounded block md:w-full md:h-full" />
        <div className="flex-grow md:p-2">
          <div className="font-bold mb-1">{ name }</div>
          <ReviewStars ratings={ratings} />
        </div>
      </Link>
    </li>
  );
}
