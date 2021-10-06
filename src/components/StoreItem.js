
import React from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../icons/LocationIcon';
import ReviewIcon from '../icons/ReviewIcon';

export default function StoreItem({ ID, photo, name, location, ratings }) {
  return (
    <li className="bg-color ">
      <Link to={`/store/${ID}`} className="flex mb-5 hover:bg-color-gray-h dark:hover:bg-color-gray-dh md:block">
        <img src={ `/photos/${photo}` } alt={name} className="w-20 h-20 border md:w-full md:h-full" />
        <div className="flex-grow pl-2 lg:pt-2">
          <h4 className="font-bold mb-1">{ name }</h4>
          <div className="text-color-gray mb-1 flex">
            <LocationIcon classList="fill-current inline-block" />
            <span className="inline-block">{ location }</span>
          </div>
          <div>
            <ReviewIcon classList="inline-block fill-current text-red-500 w-5 h-5" />
            <span className="inline-block align-middle text-xs">{ ratings }</span>
          </div>
        </div>
      </Link>
    </li>
  );
}


