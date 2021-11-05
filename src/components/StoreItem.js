
import React from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../icons/LocationIcon';
import ReviewStars from './ReviewStars';

export default function StoreItem({ store: { id, logo, name, address, ratings } }) {
  return (
    <Link to={`/store/${id}/products`} className="flex mb-5 bg-color hover:bg-color-gray-h dark:hover:bg-color-gray-dh md:block">
      <img src={ `/photos/${logo}` } alt={name} className="w-20 h-20 border rounded block md:w-full md:h-full" />
      <div className="flex-grow pl-2 lg:pt-2">
        <h4 className="font-bold mb-1">{ name }</h4>
        <div className="text-color-gray mb-1 flex items-center">
          <LocationIcon classList="fill-current inline-block w-5 h-5" />
          <span className="inline-block">{ address }</span>
        </div>
        <ReviewStars ratings={ratings} />
      </div>
    </Link>
  );
}


