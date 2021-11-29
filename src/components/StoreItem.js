
import Icon from '@mdi/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { locationIcon } from '../assets/icons';
import ReviewStars from './ReviewStars';

export default function StoreItem({ store: { id, logo, name, address, ratings } }) {
  return (
    <Link to={`/store/${id}`} className="flex gap-2 mb-4 bg-color hover:bg-color-gray-h md:block md:shadow">
      <img src={ `/photos/${logo}` } alt={name} className="w-20 h-20 border rounded block md:w-full md:h-full" />
      <div className="flex-grow md:p-2">
        <div className="font-bold mb-1">{ name }</div>
        <div className="text-color-gray mb-1 flex items-center">
          <Icon path={locationIcon} className="inline-block w-5 h-5" />
          <span className="inline-block">{ address }</span>
        </div>
        <ReviewStars ratings={ratings} />
      </div>
    </Link>
  );
}


