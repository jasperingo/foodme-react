
import React from 'react';
import { Link } from 'react-router-dom';
import LocationIcon from '../icons/LocationIcon';
import ReviewIcon from '../icons/ReviewIcon';

export default function ResturantItem({ photo, name, location, ratings }) {
  return (
    <li>
      <Link to="/" className="flex mb-3 hover:bg-gray-100">
        <img src={ "/photos/"+photo } alt="Resturant logo" className="w-20 h-20 border" />
        <div className="flex-grow pl-2">
          <h4 className="font-bold mb-1">{ name }</h4>
          <div className="text-gray-500 mb-1">
            <span className="inline-block align-middle">
              <LocationIcon />
            </span>
            <span className="inline-block align-middle">{ location }</span>
          </div>
          <div>
            <span className="inline-block align-middle text-red-500 mr-1">
              <ReviewIcon small={true} />
            </span>
            <span className="inline-block align-middle text-xs">{ ratings }</span>
          </div>
        </div>
      </Link>
    </li>
  );
}


